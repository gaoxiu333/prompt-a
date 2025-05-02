'use client';

import { z } from 'zod';

const formSchema = z.object({
  llmProvider: z.enum(['openai', 'anthropic', 'cohere', 'google']),
  model: z.enum([
    'gpt-3.5-turbo',
    'gpt-4',
    'claude-1',
    'claude-2',
    'command-r',
    'palm',
  ]),
});

export type FormSchema = z.infer<typeof formSchema>;
