import React from 'react';
import { useTheme } from '../../shared/context/ThemeContext';
import { Brain } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel: 'thinker' | 'maker';
  onModelChange: (model: 'thinker' | 'maker') => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  const { theme } = useTheme();

  return (
    <div className={`p-4 border-b transition-colors duration-200 ${
      theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <Brain className={`w-5 h-5 ${
          theme === 'dark' ? 'text-indigo-400' : 'text-indigo-500'
        }`} />
        <h2 className={`text-lg font-semibold transition-colors duration-200 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          Portdex
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onModelChange('thinker')}
          className={`p-3 rounded-lg transition-all duration-200 ${
            selectedModel === 'thinker'
              ? theme === 'dark'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-indigo-500 text-white shadow-lg'
              : theme === 'dark'
                ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-medium">Thinker</span>
            <span className="text-xs opacity-80">Analytical & Logical</span>
          </div>
        </button>
        <button
          onClick={() => onModelChange('maker')}
          className={`p-3 rounded-lg transition-all duration-200 ${
            selectedModel === 'maker'
              ? theme === 'dark'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-indigo-500 text-white shadow-lg'
              : theme === 'dark'
                ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-medium">Maker</span>
            <span className="text-xs opacity-80">Creative & Practical</span>
          </div>
        </button>
      </div>
    </div>
  );
}; 