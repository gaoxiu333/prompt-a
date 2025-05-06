'use client';

import { ChevronRight } from 'lucide-react';

import { useState } from 'react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { PromptTreeItem } from '@/database/utils';

const TreeNode = ({ item }: { item: PromptTreeItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="ml-4 py-1">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 p-1 rounded-md w-full cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
          {hasChildren && (
            <ChevronRight
              className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-90' : ''}`}
            />
          )}
          <span className={`${!hasChildren ? 'ml-6' : ''}`}>{item.name}</span>
        </CollapsibleTrigger>
        {hasChildren && (
          <CollapsibleContent>
            {item.children?.map((child: PromptTreeItem, index: number) => (
              <TreeNode key={`${child.name}-${index}`} item={child} />
            ))}
          </CollapsibleContent>
        )}
      </Collapsible>
    </div>
  );
};

const PromptSidebar = ({ data }: { data: PromptTreeItem }) => {
  console.log('PromptSidebar data:', data);
  return (
    <div className="p-4">
      {data!.children!.map((item, index) => (
        <TreeNode key={`${item.name}-${index}`} item={item} />
      ))}
    </div>
  );
};

export default PromptSidebar;
