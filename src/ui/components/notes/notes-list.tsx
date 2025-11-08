import { memo } from "react";
import { NotesItem } from "./notes-item";

interface notesListProps {
    notes: Note[];
    changeNote: (note_id: number) => void;
    selectedNote: number;
}

export const NotesList = memo(({notes, changeNote, selectedNote}: notesListProps) => {
    return (
        <div className='w-full pt-4 p-3 [&_.active]:bg-stone-200 dark:[&_.active]:bg-sky-900'>
            <div className='divide-y divide-y-stone-700 dark:divide-y-stone-400 space-y-4'>
                {
                    notes.map((note) => (
                        <NotesItem note={note} changeNote={changeNote} key={note.id} selectedNote={selectedNote} />
                    ))
                }
            </div>
        </div>
    )
});