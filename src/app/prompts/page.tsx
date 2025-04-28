import { CommonPrompt } from '@/features/common-prompt';

export default function PromptsPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-2xl font-bold">Prompts</h1>
      <p className="mt-4 text-lg">Explore a collection of prompts.</p>
      <CommonPrompt />
    </div>
  );
}
