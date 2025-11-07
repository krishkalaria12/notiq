import { useMutation, useQueryClient } from "@tanstack/react-query";

async function setNote(note_id: number, note: string) {
    return await window.electron.setNote({ id: note_id, note })
}

const queryClient = useQueryClient();

export function useDeleteNote(note_id: number, note: string){
    return useMutation({
        mutationFn: () => setNote(note_id, note),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['get-note', note_id] })
        }
    })
}