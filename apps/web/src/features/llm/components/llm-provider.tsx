'use client';

import { Edit } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import useLLM from '../hooks/use-llm';
import LLMApiKeyModal from './llm-apikey';

const LLMProvider = () => {
  const { llmProvider, llmProviderList, handleLLMProviderChange } = useLLM();
  return (
    <div className="w-full flex flex-row gap-4">
      <Label className="flex flex-row gap-4 flex-1">
        <span className="text-sm text-muted-foreground">LLM Provider:</span>
        <Select
          name="llmProvider"
          value={llmProvider.id}
          onValueChange={handleLLMProviderChange}
        >
          <SelectTrigger className="cursor-pointer flex-1">
            <SelectValue placeholder="请选择">{llmProvider.name}</SelectValue>
          </SelectTrigger>
          <SelectContent className="cursor-pointer">
            {llmProviderList.map((provider) => (
              <SelectItem key={provider.id} value={provider.id}>
                {provider.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Label>
      <Label className="flex flex-row gap-4 flex-1">
        <span className="text-sm text-muted-foreground">Model:</span>
        <Select name="model">
          <SelectTrigger className="cursor-pointer flex-1">
            <SelectValue placeholder="请选择" />
          </SelectTrigger>
          <SelectContent>
            {llmProvider.chatModels.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Label>
      <Label>
        API Key: 状态
        <LLMApiKeyModal>
          <Button variant={'outline'} className="ml-2 cursor-pointer">
            <Edit style={{ width: '1em', height: '1em' }} />
          </Button>
        </LLMApiKeyModal>
      </Label>
    </div>
  );
};

export default LLMProvider;
