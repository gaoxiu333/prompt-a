import { getPromptsFiles } from '@/database/utils';

export function CommonPrompt() {
  const prompts = getPromptsFiles();
  return (
    <>
      {prompts?.length}

      {prompts?.map((prompt) => (
        <div key={prompt.slug} className="p-4 border-b">
          <h2 className="text-xl font-bold">{prompt.slug}</h2>
          <p>
            {prompt.categories.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </p>
        </div>
      ))}
    </>
  );
}
