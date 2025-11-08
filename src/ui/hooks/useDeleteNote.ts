import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deleteNote(note_id: number) {
    return await window.electron.deleteNote({ note_id })
}

export function useDeleteNote(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (note_id: number) => deleteNote(note_id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['get-notes'] })
        }
    })
}