import { getPromptsFiles } from '@/database/utils';

import PromptSidebar from './prompt-sidebar';

const PromptWrapper = () => {
  const promptsData = getPromptsFiles();

  return <PromptSidebar data={promptsData} />;
};
export default PromptWrapper;
