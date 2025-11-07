import { memo, useEffect} from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useTheme } from "../../providers/theme-provider";
import { ScrollArea } from "../ui/scroll-area";

interface editorTempProps {
    note: string
    setContent: (content: string) => void;
}

export default memo(({ note, setContent }: editorTempProps) => {
    const editor = useCreateBlockNote({
        _tiptapOptions: {
            content: note
        }
    });
    const { theme } = useTheme()

    const onChange = async () => {
        const markdown = await editor.blocksToMarkdownLossy(editor.document);
        setContent(markdown);
    }

    useEffect(() => {
      onChange();
    }, [])
    
    
    return (
        <ScrollArea className="h-[calc(100%-40px)]">
            <BlockNoteView
                editor={editor}
                theme={theme}
                onChange={onChange}
                className="h-full"
            />
        </ScrollArea>
    )
})