import { useQuery } from "@tanstack/react-query";

async function getNotes(): Promise<Note[]> {
  const resp = await window.electron.getNotes();

  return resp;
}

export function useGetNotes() {
  return useQuery<Note[]>({
    queryKey: ["get-notes"],
    queryFn: getNotes,
    staleTime: 60_000,
  });
}