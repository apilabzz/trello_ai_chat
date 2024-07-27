import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

const TokenInput = ({ onSubmit, error: initialError }) => {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(initialError);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await onSubmit(token);
        } catch (error) {
            setError('Error validating token. Please try again.');
        }

        setLoading(false);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-4 rounded-lg shadow-md"
        >
            <h2 className="text-xl font-bold mb-4">API Labz Authentication</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
                        Enter your API Labz token
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <KeyIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input 
                            id="token"
                            type="text" 
                            value={token} 
                            onChange={(e) => setToken(e.target.value)} 
                            placeholder="Enter token"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                </div>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                    disabled={loading}
                >
                    {loading ? 'Validating...' : 'Save Token'}
                </motion.button>
            </form>
            {error && (
                <div className="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                    <ExclamationCircleIcon className="h-5 w-5 inline ml-2" />
                </div>
            )}
        </motion.div>
    );
};

export default TokenInput;