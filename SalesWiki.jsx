import React, { useState } from 'react';

const SalesWiki = ({ t, DANDLE_COLORS, wikiContent }) => {
    const [activeSection, setActiveSection] = useState(Object.keys(wikiContent)[0]);

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg flex">
            <div className="w-1/4 border-r pr-4">
                <h3 className="text-lg font-semibold mb-4">{t('productMastery')}</h3>
                <ul className="space-y-2">
                    {Object.keys(wikiContent.productMastery.sections).map(sectionId => (
                        <li key={sectionId}>
                            <button
                                onClick={() => setActiveSection(sectionId)}
                                className={`block w-full text-right p-2 rounded-lg ${activeSection === sectionId ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                            >
                                {t(sectionId)}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-3/4 pl-4">
                <h2 className="text-2xl font-bold mb-4" style={{ color: DANDLE_COLORS.text }}>
                    {wikiContent.productMastery.sections[activeSection]?.title?.[language] || t('salesWiki')}
                </h2>
                <p className="text-gray-700">
                    {wikiContent.productMastery.sections[activeSection]?.content?.[language] || 'No content available for this section.'}
                </p>
            </div>
        </div>
    );
};

export default SalesWiki;

