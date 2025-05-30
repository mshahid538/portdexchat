import React from 'react';

interface LeftPanelProps {
    messages: { id: number; text: string; sender: 'user' | 'bot' }[];
}

const LeftPanel: React.FC<LeftPanelProps> = ({ messages }) => {
    return (
        <div className="left-panel">
            <h2>Chat History</h2>
            <ul>
                {messages.map((message) => (
                    <li key={message.id} className={message.sender}>
                        {message.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeftPanel;