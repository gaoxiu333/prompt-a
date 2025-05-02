'use client';

import { Select } from '@radix-ui/react-select';
import { Edit } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
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
    <Card className="w-full">
      <CardContent className="flex flex-row gap-6">
        <Label>
          LLM Provider:
          <Select
            name="llmProvider"
            value={llmProvider.id}
            onValueChange={handleLLMProviderChange}
          >
            <SelectTrigger className="w-[180px] cursor-pointer">
              <SelectValue placeholder="Open AI">
                {llmProvider.name}
              </SelectValue>
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
        <Label>
          Model:
          <Select name="model">
            <SelectTrigger className="cursor-pointer w-[200px]">
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
            <Button variant={'ghost'}>
              <Edit style={{ width: '1em', height: '1em' }} />
            </Button>
          </LLMApiKeyModal>
        </Label>
      </CardContent>
    </Card>
  );
};

export default LLMProvider;
