import { AppConfig } from '../../shared/config/app.config';

export class AIService {
  private model: 'thinker' | 'maker' = AppConfig.api.model as 'thinker' | 'maker';
  private readonly API_URL = AppConfig.api.url;
  private readonly API_KEY = AppConfig.api.key;

  setModel(model: 'thinker' | 'maker') {
    this.model = model;
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.API_KEY}`
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are a helpful AI assistant in ${this.model} mode. ${
                this.model === 'thinker' 
                  ? 'Focus on analytical and logical responses.' 
                  : 'Focus on creative and practical solutions.'
              }`
            },
            {
              role: "user",
              content: prompt
            }
          ],
          model: this.model,
          temperature: AppConfig.chat.temperature,
          max_tokens: AppConfig.chat.maxTokens
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          data: errorData
        });
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data || !data.choices || !data.choices[0]?.message?.content) {
        console.error('Invalid API response:', data);
        throw new Error('Invalid response from API');
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw error;
    }
  }
} 