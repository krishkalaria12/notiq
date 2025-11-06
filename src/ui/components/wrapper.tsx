import { PenBox, Trash } from "lucide-react";
import Editor from "./editor/editor";
import { ModeToggle } from "./mode-toggle";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { ScrollArea } from "./ui/scroll-area";
import { WindowButtons } from "./window-buttons";

export const Wrapper = () => {
  const notes = [];
  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={30} defaultSize={35}>
          <div className="h-10 w-full border-b-[.5px] border-b-stone-300 dark:border-b-stone-800 app-dragger px-2 flex items-center justify-end">
            <span title="New note">
              <PenBox className="text-stone-900 dark:text-stone-100 h-5 cursor-pointer w-5" />
            </span>
            {notes.length > 0 && (
              <span title="Delete note">
                <Trash className="text-stone-900 dark:text-stone-100 h-5 cursor-pointer [&:hover]:text-red-600 w-5 ml-2" />
              </span>
            )}
          </div>
          <ScrollArea className="h-[calc(100%-40px)]">
            {
              <div className="h-100 flex items-center justify-center text-lg text-stone-600 dark:text-stone-500">
                <span>No notes</span>
              </div>
            }
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={30}>
          <div className="h-10 px-2 w-full border-b-[.5px] border-b-stone-300 dark:border-b-stone-800 app-dragger flex justify-between items-center">
            <ModeToggle />
              {
                <WindowButtons />
              }
          </div>
          <Editor />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Wrapper;
