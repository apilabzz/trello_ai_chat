import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TokenInput from './TokenInput';
import ErrorDialog from './ErrorDialog';
import ChatInterface from './ChatInterface';
import InitialLoading from './InitialLoading';
import { validateToken, generateReport } from '../services/apiLabzService';
import { getBoardData } from '../services/trelloService';

const PowerUp = () => {
    const [token, setToken] = useState('');
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [credits, setCredits] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        const initializeApp = async () => {
            const storedToken = localStorage.getItem('apiLabzToken');
            if (storedToken) {
                setToken(storedToken);
                await checkToken(storedToken);
            }
            loadChatHistory();
            setLoading(false);
        };

        initializeApp();
    }, []);

    const checkToken = async (tokenToCheck) => {
        const result = await validateToken(tokenToCheck);
        if (result.isValid) {
            setIsTokenValid(true);
            setCredits(result.credits);
        } else {
            setIsTokenValid(false);
            localStorage.removeItem('apiLabzToken');
        }
    };

    const loadChatHistory = () => {
        const storedHistory = localStorage.getItem('chatHistory');
        if (storedHistory) {
            setChatHistory(JSON.parse(storedHistory));
        } else {
            setChatHistory([{ type: 'ai', content: "Hi, I am AI chat bot, please ask any question?" }]);
        }
    };

    const handleTokenSubmit = async (newToken) => {
        setLoading(true);
        const result = await validateToken(newToken);
        if (result.isValid) {
            setToken(newToken);
            setIsTokenValid(true);
            setCredits(result.credits);
            localStorage.setItem('apiLabzToken', newToken);
        } else {
            toast.error(result.errorMessage || 'Invalid token. Please try again.');
        }
        setLoading(false);
    };

    const handleQuestionSubmit = async (question) => {
        try {
            const t = window.TrelloPowerUp.iframe();
            const boardData = await getBoardData(t);
            
            const response = await generateReport(token, boardData, question);
            const latestTokenInfo = await validateToken(token);
            
            if (latestTokenInfo.isValid) {
                const creditsUsed = credits - latestTokenInfo.credits;
                if (creditsUsed > 0) {
                    toast.info(`${creditsUsed} credits used`);
                }
                setCredits(latestTokenInfo.credits);
            } else {
                throw new Error('Token became invalid during report generation');
            }
            
            const updatedHistory = [...chatHistory, { type: 'user', content: question }, { type: 'ai', content: response[0].text }];
            setChatHistory(updatedHistory);
            localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
            
            return response[0].text;
        } catch (error) {
            console.error('Error processing question:', error);
            toast.error(error.message || 'An error occurred while processing your question. Please try again.');
            return null;
        }
    };

    const handleClearChat = () => {
        localStorage.removeItem('chatHistory');
        setChatHistory([{ type: 'ai', content: "Hi, I am AI chat bot, please ask any question?" }]);
        toast.success('Chat history cleared');
    };

    if (loading) {
        return <InitialLoading />;
    }

    return (
        <div className="container p-2">
            <ToastContainer />
            {!isTokenValid ? (
                <TokenInput onSubmit={handleTokenSubmit} />
            ) : (
                <ChatInterface 
                    credits={credits}
                    onQuestionSubmit={handleQuestionSubmit}
                    chatHistory={chatHistory}
                    onClearChat={handleClearChat}
                />
            )}
            {error && (
                <ErrorDialog 
                    error={error} 
                    onClose={() => setError('')} 
                />
            )}
        </div>
    );
};

export default PowerUp;