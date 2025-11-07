import { useQuery } from "@tanstack/react-query";

async function getNotes(): Promise<Note[]> {
  return window.electron.getNotes();
}

export function useGetNotes() {
  return useQuery<Note[]>({
    queryKey: ["get-notes"],
    queryFn: getNotes,
    staleTime: 60_000,
  });
}