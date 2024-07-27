const API_URL = 'https://hub.apilabz.com';

export const validateToken = async (token) => {
    try {
        const response = await fetch(`${API_URL}/user/token`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            return { isValid: true, credits: data.credits };
        } else {
            const errorData = await response.json();
            return { isValid: false, errorMessage: errorData.error || 'Unable to validate token' };
        }
    } catch (error) {
        return { isValid: false, errorMessage: 'Network error. Please check your connection and try again.' };
    }
};

export const generateReport = async (token, data, question) => {
    const url = `${API_URL}/module/5001`;
    const formattingPrompt = `
    <Instructions>
    - Think Very carefully, Take as long as you need.
    - You need to reply a short response based on Question : <question> ${question} </question>
    </Instructions>
    `;
    
    const postData = { prompt: `${formattingPrompt} ${JSON.stringify(data)}` };

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 120000); // 120 seconds timeout

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(postData),
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'An error occurred while processing your question');
        }
        
        const result = await response.json();
        return result.response;
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again later.');
        }
        throw error;
    }
};