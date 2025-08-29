import React, { useState, useEffect } from 'react';

const DailyQuiz = ({ t, language, DANDLE_COLORS, quizData, userProgress, setUserProgress, currentUser }) => {
    const quizId = 'day1'; // Assuming a single quiz for now, can be dynamic
    const quiz = quizData[quizId];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    useEffect(() => {
        if (currentUser && userProgress[currentUser.id] && userProgress[currentUser.id][quizId]) {
            const progress = userProgress[currentUser.id][quizId];
            setCurrentQuestionIndex(progress.currentQuestionIndex);
            setScore(progress.score);
            setQuizCompleted(progress.quizCompleted);
        }
    }, [currentUser, quizId, userProgress]);

    useEffect(() => {
        if (currentUser) {
            setUserProgress(prev => ({
                ...prev,
                [currentUser.id]: {
                    ...(prev[currentUser.id] || {}),
                    [quizId]: {
                        currentQuestionIndex,
                        score,
                        quizCompleted
                    }
                }
            }));
        }
    }, [currentQuestionIndex, score, quizCompleted, currentUser, quizId, setUserProgress]);

    if (!quiz) {
        return <div className="p-6 bg-white rounded-xl shadow-lg"><h2 className="text-2xl font-bold mb-4">{t("dailyQuiz")}</h2><p>No quiz available for today.</p></div>;
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    const handleOptionSelect = (index) => {
        setSelectedOption(index);
        setShowExplanation(true);
        if (index === currentQuestion.correct) {
            setScore(prev => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        setSelectedOption(null);
        setShowExplanation(false);
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setQuizCompleted(true);
        }
    };

    const handleStartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setShowExplanation(false);
        setScore(0);
        setQuizCompleted(false);
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4" style={{ color: DANDLE_COLORS.text }}>{t("dailyQuiz")}</h2>
            {!quizCompleted ? (
                <div>
                    <h3 className="text-xl font-semibold mb-4">{language === 'ar' ? quiz.title.ar : quiz.title.en}</h3>
                    <p className="mb-4 text-lg">{language === 'ar' ? currentQuestion.question.ar : currentQuestion.question.en}</p>
                    <div className="space-y-2">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(index)}
                                disabled={selectedOption !== null}
                                className={`w-full text-left p-3 border rounded-lg ${selectedOption === index ? (index === currentQuestion.correct ? 'bg-green-200' : 'bg-red-200') : 'bg-gray-50 hover:bg-gray-100'}`}
                            >
                                {language === 'ar' ? option.ar : option.en}
                            </button>
                        ))}
                    </div>
                    {showExplanation && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <p className="font-semibold">{t("explanation")}:</p>
                            <p>{language === 'ar' ? currentQuestion.explanation.ar : currentQuestion.explanation.en}</p>
                        </div>
                    )}
                    <div className="mt-6 flex justify-between items-center">
                        <p className="text-sm font-medium">{t("currentScore")}: {score}/{currentQuestionIndex + 1}</p>
                        <button
                            onClick={handleNextQuestion}
                            disabled={selectedOption === null}
                            className="px-4 py-2 text-white rounded-lg"
                            style={{ background: DANDLE_COLORS.primary }}
                        >
                            {currentQuestionIndex < quiz.questions.length - 1 ? t("nextQuestion") : t("finishQuiz")}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4">{t("quizCompleted")}</h3>
                    <p className="text-3xl font-bold mb-4" style={{ color: DANDLE_COLORS.primary }}>{t("yourScore")}: {score}/{quiz.questions.length}</p>
                    <button
                        onClick={handleStartQuiz}
                        className="px-6 py-3 text-white rounded-lg font-semibold"
                        style={{ background: DANDLE_COLORS.primary }}
                    >
                        {t("startQuiz")}
                    </button>
                </div>
            )}
        </div>
    );
};

export default DailyQuiz;

