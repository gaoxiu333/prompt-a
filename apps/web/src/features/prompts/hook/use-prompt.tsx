import usePromptStore from '../lib/prompt-store';

const usePrompt = () => {
  const { prompt, setPrompt } = usePromptStore();

  return { prompt, setPrompt };
};

export default usePrompt;
