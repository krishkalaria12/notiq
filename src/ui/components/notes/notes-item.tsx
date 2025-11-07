import { memo, useMemo } from "react";

interface notesItemProps {
    note: Note;
    changeNote: (note_id: number) => void;
}

export const NotesItem = memo(({ note, changeNote }: notesItemProps) => {
    // Memoize title and preview extraction to avoid recalculating on every render
    const { title, preview } = useMemo(() => {
        const plainText = note.note.replace(/<[^>]*>/g, '').trim();

        const title = plainText.length > 50
            ? plainText.substring(0, 50) + '...'
            : plainText || 'Untitled Note';

        const preview = plainText.length > 100
            ? plainText.substring(0, 100) + '...'
            : plainText;

        return { title, preview };
    }, [note.note]);

    return (
        <div
            className="w-full p-4 rounded-2xl cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            onClick={() => changeNote(note.id)}
        >
            <div className="font-bold text-md text-stone-900 dark:text-stone-100">{title}</div>
            <div className="flex text-xs text-stone-600 dark:text-stone-400 mt-1">
                <div className="flex-1 truncate">{preview}</div>
            </div>
        </div>
    );
});