import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createNote(note_content: string): Promise<Note> {
  return await window.electron.createNote({ note_content });
}

export function useCreateNote(onSuccessCallback?: (note: Note) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (note_content: string) => createNote(note_content),
    onSuccess: async (newNote) => {
      queryClient.setQueryData<Note[]>(["get-notes"], (oldNotes = []) => [
        newNote,
        ...oldNotes,
      ]);

      if (onSuccessCallback) onSuccessCallback(newNote);
      await queryClient.invalidateQueries({ queryKey: ["get-notes"] });
    },
  });
}