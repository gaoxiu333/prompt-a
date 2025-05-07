import { useEffect, useState } from 'react';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import ChatContainer from '@/features/chat/components/chat-container';
import PromptWrapper from '@/features/prompts/components/prompt-wrapper';

import PromptEditorLayout from './prompt-editor-layout';

function PromptManage() {
  return (
    <>
      <div className="h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={5}>
            <div className="h-full overflow-auto">
              <PromptWrapper />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={55} minSize={10}>
            <div className="h-full overflow-auto">
              <PromptEditorLayout />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={25} minSize={5}>
            <div className="h-full overflow-auto">
              <ChatContainer />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}

export default PromptManage;
