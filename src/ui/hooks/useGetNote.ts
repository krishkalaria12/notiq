import { useQuery } from "@tanstack/react-query";

async function getNote(note_id: number): Promise<Note | null> {
  return window.electron.getNote({ note_id });
}

export function useGetNote(note_id: number) {
  return useQuery<Note | null>({
    queryKey: ["get-note", note_id],
    queryFn: () => getNote(note_id),
    enabled: !!note_id,
    staleTime: 60_000,
  });
}