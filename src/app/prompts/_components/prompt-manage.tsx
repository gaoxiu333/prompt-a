import { useEffect, useState } from 'react';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { CommonPrompt } from '@/features/prompt-manage/components/common-prompt';
import { PromptPreview } from '@/features/prompt-manage/components/prompt-preview';
import PromptWrapper from '@/features/prompts/components/prompt-wrapper';

import PromptEditorLayout from './prompt-editor-layout';

function PromptManage() {
  return (
    <>
      <div className="h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={15}>
            <div className="h-full overflow-auto">
              <PromptWrapper />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={55} minSize={50}>
            <div className="h-full overflow-auto">
              <PromptEditorLayout />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={25} minSize={20}>
            <div className="h-full overflow-auto">
              <PromptPreview />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}

export default PromptManage;
