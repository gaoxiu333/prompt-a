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

const LLMProvider = () => {
  return (
    <Card className="w-full">
      {/* <h1>LLM Provider</h1>
      <p>Select your LLM provider and model.</p> */}
      <CardContent className="flex flex-row gap-6">
        <Label>
          LLM Provider:
          <Select name="llmProvider">
            <SelectTrigger className="w-[180px] cursor-pointer">
              <SelectValue placeholder="Open AI" />
            </SelectTrigger>
            <SelectContent className="cursor-pointer">
              <SelectItem value="light">Open AI</SelectItem>
              <SelectItem value="dark">XAI</SelectItem>
              <SelectItem value="system">Google</SelectItem>
              <SelectItem value="DeepSeek">DeepSeek</SelectItem>
            </SelectContent>
          </Select>
        </Label>
        <Label>
          Model:
          <Select name="model">
            <SelectTrigger className="cursor-pointer w-[200px]">
              <SelectValue placeholder="GPT-3.5 Turbo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="claude-1">Claude 1</SelectItem>
              <SelectItem value="claude-2">Claude 2</SelectItem>
              <SelectItem value="command-r">Command R</SelectItem>
              <SelectItem value="palm">Palm</SelectItem>
            </SelectContent>
          </Select>
        </Label>
        <Label>
          API Key: 状态
          <Button variant={'ghost'}>
            <Edit style={{ width: '1em', height: '1em' }} />
          </Button>
        </Label>
      </CardContent>
    </Card>
  );
};

export default LLMProvider;
