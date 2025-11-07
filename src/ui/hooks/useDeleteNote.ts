import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deleteNote(note_id: number) {
    return await window.electron.deleteNote({ note_id })
}

const queryClient = useQueryClient();

export function useDeleteNote(note_id: number){
    return useMutation({
        mutationFn: () => deleteNote(note_id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['get-notes'] })
        }
    })
}