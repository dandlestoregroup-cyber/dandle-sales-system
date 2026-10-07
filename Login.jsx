import React from 'react';
import { Lock } from 'lucide-react';

const Login = ({ userPin, setUserPin, handleLogin, language, setLanguage, t, error, DANDLE_COLORS }) => {
    const legacyNotice = language === 'ar'
        ? 'عرض تجريبي قديم — هذا الرمز ليس مصادقة حقيقية. لا تستخدم أي بيانات حقيقية أو حساسة.'
        : 'Legacy demo — this PIN is not real authentication. Do not use real or sensitive data.';

    const demoPinLabel = language === 'ar'
        ? 'أدخل رمز العرض التجريبي المكوّن من 6 أرقام'
        : 'Enter a 6-digit demo PIN';

    const enterDemoLabel = language === 'ar' ? 'دخول العرض التجريبي' : 'Enter demo';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm font-semibold text-amber-900">
                    {legacyNotice}
                </div>
                <Lock size={48} className="mx-auto mb-4" style={{ color: DANDLE_COLORS.primary }} />
                <h2 className="text-2xl font-bold mb-2" style={{ color: DANDLE_COLORS.text }}>{t('welcomeBack')}</h2>
                <p className="text-gray-600 mb-6">{demoPinLabel}</p>
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
                    {enterDemoLabel}
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
