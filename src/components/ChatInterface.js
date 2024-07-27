import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCardIcon, PaperAirplaneIcon, TrashIcon } from '@heroicons/react/24/solid';

const ChatInterface = ({ credits, onQuestionSubmit, chatHistory, onClearChat }) => {
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim() || loading) return;

        setLoading(true);
        await onQuestionSubmit(question);
        setLoading(false);
        setQuestion('');
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden p-1">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <CreditCardIcon className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-xs font-semibold">Credits: {credits}</span>
                </div>
                <div className="relative group">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClearChat}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold p-1 rounded text-xs"
                    >
                        <TrashIcon className="h-3 w-3" />
                    </motion.button>
                    <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 left-0 -translate-x-full mt-1 z-10 whitespace-nowrap">
                        Clear chat
                    </span>
                </div>
            </div>
            <div className="overflow-y-auto max-h-64 mb-2">
                {chatHistory.map((message, index) => (
                    <div key={index} className={`mb-2 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-2 rounded-lg text-xs ${message.type === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                            {message.content}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question..."
                    className="w-full mb-2 p-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center text-xs ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Loading...' : (
                        <>
                            <PaperAirplaneIcon className="h-3 w-3 mr-1" />
                            Submit
                        </>
                    )}
                </motion.button>
            </form>
        </div>
    );
};

export default ChatInterface;