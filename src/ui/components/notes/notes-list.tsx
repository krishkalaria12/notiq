import { memo } from "react";
import { NotesItem } from "./notes-item";

interface notesListProps {
    notes: Note[];
    changeNote: (note_id: number) => void;
}

export const NotesList = memo(({notes, changeNote}: notesListProps) => {
    return (
        <div className='w-full p-3 [&_.active]:bg-stone-200 dark:[&_.active]:bg-sky-900'>
            <div className='text-md capitalize'>Hello</div>
            <div className='divide-y divide-y-stone-700 dark:divide-y-stone-400'>
                {
                    notes.map((note) => (
                        <NotesItem note={note} changeNote={changeNote} key={note.id} />
                    ))
                }
            </div>
        </div>
    )
});