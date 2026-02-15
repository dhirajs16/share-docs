'use client';

import { TamboProvider } from '@tambo-ai/react';
import { components, tools } from '@/lib/tambo-registry';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TamboProvider 
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tools={tools}
      initialMessages={[
        {
          role: 'system',
          content: [{
            type: 'text',
            text: "You are a Life Coach. Always use tools to get data. Always render TodoList or EventList components. Never print raw data."
          }]
        }
      ]}
    >
      {children}
    </TamboProvider>
  );
}
