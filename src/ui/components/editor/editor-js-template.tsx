import { memo } from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useTheme } from "../../providers/theme-provider";
import { ScrollArea } from "../ui/scroll-area";

export default memo(() => {
    const editor = useCreateBlockNote();
    const { theme } = useTheme()
    
    return (
        <ScrollArea className="h-[calc(100%-40px)]">
            <BlockNoteView
                editor={editor}
                onChange={() => console.log("hello")}
                theme={theme}
                className="h-full"
            />
        </ScrollArea>
    )
})