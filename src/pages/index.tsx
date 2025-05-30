import React, { useState, useEffect } from 'react';
import LeftPanel from '../components/LeftPanel';
import MiddlePanel from '../components/MiddlePanel';
import RightPanel from '../components/RightPanel';
import { apiClient } from '../utils/apiClient';

const HomePage = () => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async () => {
        if (!currentMessage) return;

        const userMessage = { text: currentMessage, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);
        setCurrentMessage('');
        setLoading(true);

        try {
            const response = await apiClient.sendMessage(currentMessage);
            const botMessage = { text: response.data.reply, sender: 'bot' };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/4">
                <LeftPanel messages={messages} />
            </div>
            <div className="w-1/2">
                <MiddlePanel
                    currentMessage={currentMessage}
                    setCurrentMessage={setCurrentMessage}
                    handleSendMessage={handleSendMessage}
                    loading={loading}
                />
            </div>
            <div className="w-1/4">
                <RightPanel />
            </div>
        </div>
    );
};

export default HomePage;