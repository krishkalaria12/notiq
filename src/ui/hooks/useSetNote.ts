import { useMutation, useQueryClient } from "@tanstack/react-query";

async function setNote(note_id: number, note: string) {
    return await window.electron.setNote({ id: note_id, note })
}

export function useSetNote(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ note_id, note }: { note_id: number; note: string }) =>
            setNote(note_id, note),
        onSuccess: async (_, { note_id }) => {
            await queryClient.invalidateQueries({ queryKey: ['get-note', note_id] })
            await queryClient.invalidateQueries({ queryKey: ['get-notes'] })
        }
    })
}