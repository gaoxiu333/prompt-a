export interface Prompt {
  slug: string;
  categories: string[];
  content: string;
  metadata?: {
    title?: string;
    summary?: string;
    publishedAt?: string;
  };
}

export interface PromptsByCategory {
  [category: string]: {
    [slug: string]: Prompt;
  };
}
