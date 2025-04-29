import { useEffect, useState } from 'react';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { CommonPrompt } from '@/features/prompt-manage/components/common-prompt';
import { PromptPreview } from '@/features/prompt-manage/components/prompt-preview';

import PromptEditorLayout from './prompt-editor-layout';

export function PromptManage() {
  return (
    <>
      <div className="h-screen">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={15}>
            <CommonPrompt />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={55} minSize={50}>
            <PromptEditorLayout />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={25} minSize={20}>
            <PromptPreview />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
