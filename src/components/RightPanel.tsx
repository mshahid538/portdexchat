import React from 'react';

const RightPanel: React.FC = () => {
    return (
        <div className="flex flex-col p-4 bg-gray-100 border-l border-gray-300">
            <h2 className="text-lg font-semibold mb-4">Additional Features</h2>
            <p className="text-gray-700">This panel can be used for user settings, chat statistics, or any other relevant information.</p>
            {/* Add more components or features as needed */}
        </div>
    );
};

export default RightPanel;