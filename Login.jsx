import React from 'react';
import { Lock } from 'lucide-react';

const Login = ({ userPin, setUserPin, handleLogin, language, setLanguage, t, error, DANDLE_COLORS }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <Lock size={48} className="mx-auto mb-4" style={{ color: DANDLE_COLORS.primary }} />
                <h2 className="text-2xl font-bold mb-2" style={{ color: DANDLE_COLORS.text }}>{t('welcomeBack')}</h2>
                <p className="text-gray-600 mb-6">{t('enterPin')}</p>
                <input
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-center text-xl tracking-widest"
                    maxLength="6"
                    value={userPin}
                    onChange={(e) => setUserPin(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleLogin();
                        }
                    }}
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    onClick={handleLogin}
                    className="w-full text-white p-3 rounded-lg font-semibold"
                    style={{ background: DANDLE_COLORS.primary }}
                >
                    {t('login')}
                </button>
                <div className="mt-6">
                    <button
                        onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                        className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                        {language === 'ar' ? 'English' : 'العربية'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;

