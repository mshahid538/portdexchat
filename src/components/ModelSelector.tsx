import React from 'react';
import { useTheme } from '../shared/context/ThemeContext';
import { ModelType } from '../types/chat';

interface ModelSelectorProps {
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
}

const models: { id: ModelType; name: string; description: string }[] = [
  {
    id: 'thinker',
    name: 'Thinker',
    description: 'Analytical and logical responses',
  },
  {
    id: 'maker',
    name: 'Maker',
    description: 'Creative and innovative solutions',
  },
];

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const { theme } = useTheme();

  return (
    <div className="space-y-2">
      <label
        className={`block text-sm font-medium ${
          theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
        }`}
      >
        Model
      </label>
      <div className="space-y-2">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => onModelChange(model.id)}
            className={`w-full p-3 rounded-lg text-left transition-colors duration-200 ${
              theme === 'dark'
                ? selectedModel === model.id
                  ? 'bg-indigo-500/20 border-indigo-500'
                  : 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50'
                : selectedModel === model.id
                ? 'bg-indigo-50 border-indigo-500'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            } border`}
          >
            <div className="font-medium">{model.name}</div>
            <div
              className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {model.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 