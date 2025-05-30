import React, { useEffect, useState } from 'react';

const MiddlePanel = () => {
    const [currentMessage, setCurrentMessage] = useState('');
    const [response, setResponse] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        if (!currentMessage) return;

        setIsTyping(true);
        // Simulate sending message to API
        const apiResponse = await sendMessageToAPI(currentMessage);
        setResponse(apiResponse);
        setCurrentMessage('');
        setIsTyping(false);
    };

    const sendMessageToAPI = async (message: string) => {
        // Replace with actual API call
        const response = await fetch('https://api.portdex.ai/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer apiqxhQVMoOkC7KpyZPfy81uQ'
            },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        return data.reply; // Adjust based on actual API response structure
    };

    useEffect(() => {
        if (isTyping) {
            const typingEffect = setTimeout(() => {
                setResponse('...'); // Simulate typing effect
            }, 1000);
            return () => clearTimeout(typingEffect);
        }
    }, [isTyping]);

    return (
        <div className="middle-panel">
            <div className="current-message">
                {isTyping ? <span>{response}</span> : <span>{currentMessage}</span>}
            </div>
            <input
                type="text"
                value={currentMessage}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
            />
        </div>
    );
};

export default MiddlePanel;