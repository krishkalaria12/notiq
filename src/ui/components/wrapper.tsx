import { PenBox, Trash } from "lucide-react";
import { useCallback, useState } from "react";
import Editor from "./editor/editor";
import { ModeToggle } from "./mode-toggle";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { ScrollArea } from "./ui/scroll-area";
import { WindowButtons } from "./window-buttons";
import { useGetNotes } from "../hooks/useGetNotes";
import { useGetNote } from "../hooks/useGetNote";
import EmptyUI from "./notes/empty-ui";
import { NotesList } from "./notes/notes-list";
import { useCreateNote } from "../hooks/useCreateNote";
import { useSetNote } from "../hooks/useSetNote";
import { useDeleteNote } from "../hooks/useDeleteNote";

export const Wrapper = () => {
  const { data: notes, isLoading: allNotesLoading } = useGetNotes();
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  const noteIdToLoad = selectedNoteId ?? notes?.[0]?.id;
  const { data: note, isLoading: singleNoteLoading } = useGetNote(noteIdToLoad!);

  const { mutate: createNote } = useCreateNote((newNote) => {
    setSelectedNoteId(newNote.id);
  });
  const { mutate: setNote } = useSetNote();
  const { mutate: deleteNote } = useDeleteNote();

  const handleCreateNote = useCallback(() => {
    createNote("");
  }, [createNote]);

  const handleDeleteNote = useCallback(() => {
    deleteNote(selectedNoteId!);
  }, [selectedNoteId, deleteNote]);

  const handleSetNote = useCallback((content: string) => {
    if (selectedNoteId) {
      setNote({ note_id: selectedNoteId, note: content });
    }
  },[selectedNoteId, setNote]);

  const handleChangeNote = useCallback((note_id: number) => {
    setSelectedNoteId(note_id)
  }, []);
  
  if (allNotesLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <span className="text-lg text-stone-600 dark:text-stone-400">
          Loading notes...
        </span>
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="h-screen w-full">
        <EmptyUI onClick={handleCreateNote} />
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={30} defaultSize={35}>
          <div className="h-10 w-full border-b-[.5px] border-b-stone-300 dark:border-b-stone-800 app-dragger px-2 flex items-center justify-end">
            <span title="New note" onClick={handleCreateNote}>
              <PenBox className="text-stone-900 dark:text-stone-100 h-5 cursor-pointer w-5" />
            </span>
            <span title="Delete note" onClick={handleDeleteNote}>
              <Trash className="text-stone-900 dark:text-stone-100 h-5 cursor-pointer [&:hover]:text-red-600 w-5 ml-2" />
            </span>
          </div>
          <ScrollArea className="h-[calc(100%-40px)]">
            <NotesList selectedNote={selectedNoteId!} changeNote={handleChangeNote} notes={notes} />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={30}>
          <div className="h-10 px-2 w-full border-b-[.5px] border-b-stone-300 dark:border-b-stone-800 app-dragger flex justify-between items-center">
            <ModeToggle />
            <WindowButtons />
          </div>
          {singleNoteLoading ? (
            <div className="flex items-center justify-center h-[calc(100%-40px)]">
              <span className="text-stone-600 dark:text-stone-400">
                Loading note...
              </span>
            </div>
          ) : note ? (
            <Editor key={note.id} note={note.note} setContent={handleSetNote} />
          ) : (
            <div className="flex items-center justify-center h-[calc(100%-40px)]">
              <span className="text-stone-600 dark:text-stone-400">
                Select a note
              </span>
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};