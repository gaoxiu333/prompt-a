import { getPromptsFiles } from '@/database/utils';
import { Prompt } from '@/types/prompt';
import { formatString } from '@/utils/string';

export function CommonPrompt() {
  const promptsData = getPromptsFiles();

  return (
    <div className="flex flex-col w-full overflow-auto">
      {Object.entries(promptsData).map(([category, prompts]) => (
        <div key={category} className="mb-6">
          <h2 className="text-xl font-bold mb-4 px-4">{prompts.title}</h2>
          <div className="flex flex-col">
            {prompts.map((prompt: Prompt) => (
              <div key={prompt.slug} className="p-2">
                <h3>{formatString(prompt.slug)}</h3>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
