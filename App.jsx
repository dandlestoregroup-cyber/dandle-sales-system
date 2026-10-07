import { useState, useEffect, useMemo } from 'react';
import { BarChart2, BookOpen, Globe, Lock, Package, Star } from 'lucide-react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import OrderForm from './components/OrderForm';
import SalesWiki from './components/SalesWiki';
import DailyQuiz from './components/DailyQuiz';
import Modal from './components/Modal';
import { DANDLE_COLORS, users, quizData, productStories, wikiContent, translations, productData, addOns, colorOptions } from './data';
  
const DandleSalesSystem = () => {
    const getInitialState = (key, defaultValue) => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : defaultValue;
        } catch (error) {
            console.error(`Error reading from localStorage for key "${key}":`, error);
            return defaultValue;
        }
    };
  
    const [currentView, setCurrentView] = useState('login');
    const [language, setLanguage] = useState(getInitialState('dandle_language', 'ar'));
    const [userPin, setUserPin] = useState('');
    const [currentUser, setCurrentUser] = useState(getInitialState('dandle_currentUser', null));
    const [userProgress, setUserProgress] = useState(getInitialState('dandle_userProgress', {}));
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({ isOpen: false, title: '', content: null, onClose: null });
  
    const t = (key) => translations[key]?.[language] || key;
  
    const mockDashboardData = useMemo(() => ({
        sales: {
            my_sales: 120000,
            leaderboard: [
                { name: 'محمد حسن', nameEn: 'Mohamed Hassan', sales: 165000 * 1.1 },
                { name: 'أميرة خليل', nameEn: 'Amira Khalil', sales: 132000 * 1.1 },
            ],
            guide: language === 'ar' ? "كرسيك ملاذك. أغلق الصفقة لتستحق شارة!" : "Your recliner is your sanctuary. Close the deal to earn a badge!",
        }
    }), [language]);
  
    useEffect(() => {
        localStorage.setItem('dandle_language', JSON.stringify(language));
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);
  
    useEffect(() => {
        localStorage.setItem('dandle_currentUser', JSON.stringify(currentUser));
        if (currentUser) {
            setCurrentView('dashboard');
        } else {
            setCurrentView('login');
        }
    }, [currentUser]);
  
    useEffect(() => {
        localStorage.setItem('dandle_userProgress', JSON.stringify(userProgress));
    }, [userProgress]);
  
    useEffect(() => {
        if (currentUser) {
            const fetchDashboard = async () => {
                setLoading(true);
                try {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    setDashboardData(mockDashboardData[currentUser.role] || mockDashboardData.sales);
                } catch (err) {
                    setError(t('errorFetchingData'));
                }
                setLoading(false);
            };
            fetchDashboard();
        }
    }, [currentUser, language, mockDashboardData]);
  
    const handleLogin = () => {
        if (userPin.length !== 6 || !/^\d+$/.test(userPin)) {
            setError(t('invalidPin'));
            return;
        }
        if (users[userPin]) {
            setError(null);
            setCurrentUser(users[userPin]);
            setUserPin('');
        } else {
            setError(t('invalidPin'));
        }
    };
  
    const handleLogout = () => {
        setCurrentUser(null);
        setDashboardData(null);
        localStorage.removeItem('dandle_currentUser');
    };
  
    if (currentView === 'login' || !currentUser) {
        return <Login {...{ userPin, setUserPin, handleLogin, language, setLanguage, t, error, DANDLE_COLORS }} />;
    }
  
    const navItems = [
        { id: 'dashboard', icon: BarChart2, label: t('dashboard'), roles: ['sales', 'ops', 'finance', 'leadership'] },
        { id: 'order', icon: Package, label: t('orderForm'), roles: ['sales'] },
        { id: 'wiki', icon: BookOpen, label: t('salesWiki'), roles: ['sales', 'leadership'] },
        { id: 'quiz', icon: Star, label: t('dailyQuiz'), roles: ['sales', 'leadership'] }
    ];
  
    const renderView = () => {
        switch (currentView) {
            case 'dashboard':
                return <Dashboard {...{ dashboardData, loading, currentUser, t, language, DANDLE_COLORS, setCurrentView, setModal }} />;
            case 'order':
                return <OrderForm {...{ t, language, DANDLE_COLORS, currentUser, productData, addOns, productStories, colorOptions, dashboardData, userProgress, setModal }} />;
            case 'wiki':
                return <SalesWiki {...{ t, language, DANDLE_COLORS, wikiContent }} />;
            case 'quiz':
                return <DailyQuiz {...{ t, language, DANDLE_COLORS, quizData, userProgress, setUserProgress, currentUser }} />;
            default:
                return <Dashboard {...{ dashboardData, loading, currentUser, t, language, DANDLE_COLORS, setCurrentView, setModal }} />;
        }
    };
  
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 rtl">
            <div className="bg-amber-50 border-b border-amber-300 px-4 py-2 text-center text-sm font-semibold text-amber-900">
                {language === 'ar'
                    ? 'عرض تجريبي قديم — لا توجد مصادقة خادمية. لا تستخدم بيانات حقيقية أو حساسة.'
                    : 'Legacy demo — there is no server-side authentication. Do not use real or sensitive data.'}
            </div>
            <header className="bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold" style={{ color: DANDLE_COLORS.primary }}>{t('brandPromise')}</h1>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                        <Globe size={20} />
                    </button>
                    {currentUser && (
                        <div className="relative group">
                            <button className="flex items-center space-x-2">
                                <img src="https://via.placeholder.com/30" alt="User Avatar" className="rounded-full" />
                                <span className="font-semibold text-gray-700">{language === 'ar' ? currentUser.nameAr : currentUser.name}</span>
                            </button>
                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <button
                                    onClick={handleLogout}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
                                >
                                    {t('logout')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </header>
            <div className="flex flex-1">
                <nav className="w-64 bg-white shadow-lg p-4">
                    <ul className="space-y-2">
                        {navItems.filter(item => item.roles.includes(currentUser.role)).map(item => (
                            <li key={item.id}>
                                <button
                                    onClick={() => setCurrentView(item.id)}
                                    className={`flex items-center space-x-3 p-3 rounded-lg w-full text-right ${currentView === item.id ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    <item.icon size={20} />
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <main className="flex-1 p-6">
                    {renderView()}
                </main>
            </div>
            <Modal {...modal} DANDLE_COLORS={DANDLE_COLORS} />
        </div>
    );
};
  
export default DandleSalesSystem;

