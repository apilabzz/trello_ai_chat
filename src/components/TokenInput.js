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
            console.error('Error validating token:', error);
            setError('Error validating token. Please try again.');
        }

        setLoading(false);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-4 rounded-lg"
        >
            <h2 className="text-lg font-bold mb-3">API Labz Authentication</h2>
            <div className="mb-4">
                <p className="text-xs text-gray-600 mb-2">To get your API token, follow these steps:</p>
                <ol className="list-decimal list-inside text-xs text-gray-600">
                    <li className="mb-1">Go to <a href="https://apilabz.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">apilabz.com</a> and log in via Google.</li>
                    <li className="mb-1">Navigate to your <a href="https://apilabz.com/profile" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">profile page</a>.</li>
                    <li>Copy the API token and paste it below.</li>
                </ol>
            </div>
            <form onSubmit={handleSubmit} className="mb-3">
                <div className="mb-3">
                    <label htmlFor="token" className="block text-xs font-medium text-gray-700 mb-1">
                        Enter your API Labz token
                    </label>
                    <div className="relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <KeyIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                        </div>
                        <input 
                            id="token"
                            type="text" 
                            value={token} 
                            onChange={(e) => setToken(e.target.value)} 
                            placeholder="Enter token"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-9 text-xs border-gray-300 rounded-md"
                        />
                    </div>
                </div>
                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
                    disabled={loading}
                >
                    {loading ? 'Validating...' : 'Save Token'}
                </motion.button>
            </form>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative text-xs" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                    <ExclamationCircleIcon className="h-4 w-4 inline ml-1" />
                </div>
            )}
        </motion.div>
    );
};

export default TokenInput;