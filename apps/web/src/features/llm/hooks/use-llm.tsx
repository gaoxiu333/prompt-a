import { useState } from 'react';

import { LLM_PROVIDER } from '../lib/constant';

const useLLM = () => {
  const llmProviderList = LLM_PROVIDER;
  const [llmProvider, setLLMProvider] = useState(llmProviderList[0]);
  const [model, setModel] = useState(llmProvider.chatModels[0].id);
  const [modelName, setModelName] = useState(
    llmProvider.chatModels[0].displayName,
  );
  // 选择 LLM 供应商
  const handleLLMProviderChange = (provider: string) => {
    const selectedProvider = llmProviderList.find((p) => p.id === provider);
    if (selectedProvider) {
      setLLMProvider(selectedProvider);
      setModel(selectedProvider.chatModels[0].id);
      setModelName(selectedProvider.chatModels[0].displayName);
    }
  };
  // 选择模型
  const handleModelChange = (model: string) => {
    const selectedModel = llmProvider.chatModels.find((m) => m.id === model);
    if (selectedModel) {
      setModel(model);
      setModelName(selectedModel.displayName);
    }
  };

  return {
    llmProviderList,
    llmProvider,
    modelName,
    model,
    handleLLMProviderChange,
    handleModelChange,
  };
};

export default useLLM;
