import { NotesItem } from "./notes-item";

export const NotesList = () => {
    return (
        <div className='w-full p-3 [&_.active]:bg-stone-200 dark:[&_.active]:bg-sky-900'>
            <div className='text-md capitalize'>Hello</div>
            <div className='divide-y divide-y-stone-700 dark:divide-y-stone-400'>
                <NotesItem />
            </div>
        </div>
    )
};