import axios from 'axios';
import { AppConfig } from '../shared/config/app.config';

export const apiClient = {
    sendMessage: async (message: string) => {
        try {
            const response = await axios.post(`${AppConfig.api.url}/chat`, {
                message: message,
                key: AppConfig.api.key,
            });
            return response.data;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    },
    getMessages: async () => {
        try {
            const response = await axios.get(`${AppConfig.api.url}/messages`, {
                headers: {
                    'Authorization': `Bearer ${AppConfig.api.key}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        }
    },
};