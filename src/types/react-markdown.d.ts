declare module 'react-markdown' {
  import { ComponentType, ReactNode } from 'react';

  export interface ReactMarkdownOptions {
    children: string;
    className?: string;
  }

  const ReactMarkdown: ComponentType<ReactMarkdownOptions>;
  export default ReactMarkdown;
} 