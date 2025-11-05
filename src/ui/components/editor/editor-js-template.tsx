import { memo } from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useTheme } from "../theme-provider";

export default memo(() => {
    const editor = useCreateBlockNote();
    const { theme } = useTheme()
    
    return (
        <BlockNoteView
            editor={editor}
            onChange={() => console.log("hello")}
            theme={theme}
        />
    )
})