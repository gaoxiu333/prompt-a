import { useState } from 'react';

import { Button } from '@/components/ui/button';

interface MessageBubbleProps {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const MessageBubble = ({ role, content }: MessageBubbleProps) => {
  return (
    <div className="flex flex-col gap-1">
      <Role role={role} />
      <Content content={content} />
    </div>
  );
};

const Role = ({ role }: { role: MessageBubbleProps['role'] }) => {
  return (
    <div className={`text-sm text-gray-500 px-2 py-1 rounded-md w-fit `}>
      {role}
    </div>
  );
};

const Content = ({ content }: { content: MessageBubbleProps['content'] }) => {
  return (
    <div className="pl-4 relative">
      <div className="whitespace-pre-wrap">{content}</div>
      <div className="absolute top-0 right-0">
        <CopyButton content={content} />
      </div>
    </div>
  );
};

function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-6 px-2 text-xs hover:bg-gray-100"
      onClick={handleCopy}
    >
      {copied ? '已复制' : '复制'}
    </Button>
  );
}

export default MessageBubble;
