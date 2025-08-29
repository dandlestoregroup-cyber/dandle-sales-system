import React, { useState, useEffect, useRef } from 'react';
import { DollarSign, Trophy, BookOpen, Star, TrendingUp, Award, Target, Users, BarChart, PieChart, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, ComposedChart, Area } from 'recharts';

const Dashboard = ({ dashboardData, loading, currentUser, t, language, DANDLE_COLORS, setCurrentView, setModal }) => {
    const [mySales, setMySales] = useState(0);
    const salesRef = useRef(0);

    useEffect(() => {
        if (dashboardData?.sales?.my_sales) {
            const targetSales = dashboardData.sales.my_sales;
            const duration = 1000; // milliseconds
            const start = performance.now();

            const animateSales = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                const currentSales = Math.floor(progress * targetSales);
                setMySales(currentSales);
                if (progress < 1) {
                    requestAnimationFrame(animateSales);
                }
            };
            requestAnimationFrame(animateSales);
        }
    }, [dashboardData?.sales?.my_sales]);

    if (loading) {
        return (
            <div className="text-center p-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: DANDLE_COLORS.primary, margin: 'auto' }}></div>
                <p className="mt-4">Loading dashboard...</p>
            </div>
        );
    }

    if (!dashboardData) {
        return (
            <div className="text-center p-6">
                <p className="text-red-500 mb-4">{t('errorFetchingData')}</p>
                <button onClick={() => window.location.reload()} className="px-4 py-2 text-white rounded-lg" style={{ background: DANDLE_COLORS.primary }}>
                    {t('retry')}
                </button>
            </div>
        );
    }

    const salesTrendData = [
        { name: 'Day 1', sales: 4000 }, { name: 'Day 5', sales: 7000 }, { name: 'Day 10', sales: 12000 },
        { name: 'Day 15', sales: 10000 }, { name: 'Day 20', sales: 18000 }, { name: 'Day 25', sales: 22000 },
        { name: 'Day 30', sales: dashboardData?.sales?.my_sales || 25000 }
    ];

    const salesFunnelData = [
        { name: 'Leads', value: 50 },
        { name: 'Proposals', value: 20 },
        { name: 'Closed', value: 10 },
    ];

    const productPopularityData = [
        { product: 'RelaxMax Manual', branch: 'Citystars', sales: 15 },
        { product: 'RelaxMax Power', branch: 'Citystars', sales: 20 },
        { product: 'Diva Manual', branch: 'Al-Sawalhi', sales: 10 },
        { product: 'Diva Power', branch: 'Al-Sawalhi', sales: 18 },
        { product: 'ComfortPlus Power', branch: 'Mohandeseen', sales: 12 },
        { product: 'CozyCompanion Loveseat', branch: 'Smouha', sales: 8 },
    ];

    const quizProgress = currentUser && userProgress[currentUser.id] && userProgress[currentUser.id].day1 ? userProgress[currentUser.id].day1 : { score: 0, currentQuestionIndex: 0, quizCompleted: false };
    const totalQuizQuestions = 1; // Assuming day1 quiz has 1 question for now
    const overallQuizCompletionRate = (quizProgress.quizCompleted ? 1 : 0) * 100; // Simplified for now

    const achievementNotifications = [
        { id: 1, message: language === 'ar' ? 'أغلقت 5 صفقات هذا الأسبوع! حصلت على شارة النخبة!' : 'Closed 5 deals this week! Earned Elite Closer badge!', new: true },
    ];

    const monthlyGoal = 150000; // Example goal
    const progressPercentage = Math.min((mySales / monthlyGoal) * 100, 100);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Personal Sales Spotlight */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">{t('mySales')}</h3>
                        <DollarSign className="text-green-500" size={24} />
                    </div>
                    <div className="text-4xl font-bold mb-2" style={{ color: DANDLE_COLORS.primary }}>{mySales.toLocaleString()} EGP</div>
                    <p className="text-sm text-gray-600">{t('thisMonth')}</p>
                </div>
                <p className="text-sm font-medium text-center mt-4" style={{ color: DANDLE_COLORS.accent }}>
                    {language === 'ar' ? 'أنت نجم المبيعات!' : 'You’re a sales star!'}
                </p>
            </div>

            {/* Leaderboard Showcase */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{t('leaderboard')}</h3>
                    <Trophy className="text-yellow-500" size={24} />
                </div>
                <div className="space-y-2">
                    {dashboardData?.sales?.leaderboard?.slice(0, 5).map((rep, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <span className="text-sm">{index + 1}. {language === 'ar' ? rep.name : rep.nameEn}</span>
                            <span className="text-sm font-semibold" style={{ color: DANDLE_COLORS.primary }}>{rep.sales?.toLocaleString()} EGP</span>
                            {index === 0 && <Award className="text-gold-500" size={18} />} {/* Gold badge */}
                            {index === 1 && <Award className="text-silver-500" size={18} />} {/* Silver badge */}
                            {index === 2 && <Award className="text-bronze-500" size={18} />} {/* Bronze badge */}
                        </div>
                    ))}
                </div>
            </div>

            {/* Sales Trends Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-1">
                <h3 className="text-lg font-semibold mb-4">{t('salesTrends')}</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={salesTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="sales" stroke={DANDLE_COLORS.primary} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Quiz Performance Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{t('quizPerformance')}</h3>
                    <Star className="text-purple-500" size={24} />
                </div>
                <p className="text-xl font-bold mb-2">{t('yourScore')}: {quizProgress.score}/{totalQuizQuestions} {t('onProductFundamentals')}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="h-2.5 rounded-full" style={{ width: `${overallQuizCompletionRate}%`, backgroundColor: DANDLE_COLORS.accent }}></div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{overallQuizCompletionRate}% {t('ofQuizzesCompleted')}</p>
                <button
                    onClick={() => setCurrentView('quiz')}
                    className="w-full text-white p-3 rounded-lg font-semibold"
                    style={{ background: DANDLE_COLORS.primary }}
                >
                    {t('takeTodaysQuiz')}
                </button>
            </div>

            {/* Knowledge Badges (Simplified) */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{t('knowledgeBadges')}</h3>
                    <Award className="text-blue-500" size={24} />
                </div>
                <div className="flex space-x-4 overflow-x-auto py-2">
                    <div className="flex flex-col items-center">
                        <Award size={48} className="text-gold-500" />
                        <p className="text-xs mt-1">{t('productMaster')}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Award size={48} className="text-green-500" />
                        <p className="text-xs mt-1">{t('zeroGravityExpert')}</p>
                    </div>
                </div>
            </div>

            {/* Wiki Engagement Tracker (Simplified) */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{t('wikiEngagement')}</h3>
                    <BookOpen className="text-orange-500" size={24} />
                </div>
                <p className="text-xl font-bold mb-2">{t('visitedRelaxMax')}</p>
                <p className="text-sm text-gray-600 mb-4">{t('learnAboutDiva')}</p>
                <button
                    onClick={() => setCurrentView('wiki')}
                    className="w-full text-white p-3 rounded-lg font-semibold"
                    style={{ background: DANDLE_COLORS.accent }}
                >
                    {t('goToSalesWiki')}
                </button>
            </div>

            {/* Achievement Notifications */}
            {achievementNotifications.filter(n => n.new).map(notification => (
                <div key={notification.id} className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md col-span-full">
                    <p className="font-bold">{notification.message}</p>
                </div>
            ))}

            {/* Progress Wheel */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold mb-4">{t('monthlyGoal')}</h3>
                <div className="relative w-32 h-32">
                    <div className="absolute inset-0 rounded-full flex items-center justify-center text-xl font-bold" style={{ color: DANDLE_COLORS.primary }}>
                        {progressPercentage.toFixed(0)}%
                    </div>
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                            className="text-gray-200 stroke-current"
                            strokeWidth="10"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                        />
                        <circle
                            className="stroke-current transition-all duration-500 ease-out"
                            strokeWidth="10"
                            strokeDasharray={`${progressPercentage * 2.51}, 251`}
                            strokeLinecap="round"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            style={{ stroke: DANDLE_COLORS.primary, transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                        />
                    </svg>
                </div>
                <p className="text-sm text-gray-600 mt-2">{t('salesTarget')}: {monthlyGoal.toLocaleString()} EGP</p>
            </div>

            {/* Team Challenges (Simplified) */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{t('teamChallenges')}</h3>
                    <Users className="text-indigo-500" size={24} />
                </div>
                <p className="text-xl font-bold mb-2">{t('teamCitystarsChallenge')}</p>
                <p className="text-sm text-gray-600">{t('countdown')}: 15 {t('days')}</p>
            </div>

            {/* Sales Funnel Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-1">
                <h3 className="text-lg font-semibold mb-4">{t('salesFunnel')}</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <ComposedChart
                        layout="vertical"
                        data={salesFunnelData}
                        margin={{
                            top: 20, right: 20, bottom: 20, left: 20,
                        }}
                    >
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="name" width={100} />
                        <Tooltip />
                        <Bar dataKey="value" barSize={20} fill={DANDLE_COLORS.primary} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* Product Popularity Heatmap (Simplified) */}
            <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-1">
                <h3 className="text-lg font-semibold mb-4">{t('productPopularity')}</h3>
                <div className="grid grid-cols-2 gap-2">
                    {productPopularityData.map((item, index) => (
                        <div key={index} className="p-2 rounded-lg text-center text-sm"
                            style={{ backgroundColor: `rgba(243, 122, 29, ${item.sales / 25})`, color: item.sales / 25 > 0.6 ? 'white' : 'black' }}>
                            {item.product} ({item.sales})
                        </div>
                    ))}
                </div>
            </div>

            {/* Performance Insights (Simplified) */}
            <div className="bg-white rounded-xl shadow-lg p-6 col-span-full">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{t('performanceInsights')}</h3>
                    <Info className="text-gray-500" size={24} />
                </div>
                <p className="text-gray-700 text-sm">{t('upsellTip')}</p>
            </div>

            {/* Quick Actions / Call to Action */}
            <div className="bg-white rounded-xl shadow-lg p-6 col-span-full md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    onClick={() => setCurrentView('order')}
                    className="w-full text-white p-4 rounded-lg font-semibold flex items-center justify-center space-x-2"
                    style={{ background: DANDLE_COLORS.primary }}
                >
                    <DollarSign size={20} />
                    <span>{t('newOrder')}</span>
                </button>
                <button
                    onClick={() => setCurrentView('quiz')}
                    className="w-full text-white p-4 rounded-lg font-semibold flex items-center justify-center space-x-2"
                    style={{ background: DANDLE_COLORS.primary }}
                >
                    <Star size={20} />
                    <span>{t('takeDailyQuiz')}</span>
                </button>
            </div>
        </div>
    );
};

export default Dashboard;

