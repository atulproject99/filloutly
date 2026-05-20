import { trpc } from "~/trpc/client";

export default function useUser() {
  const { data, error, isLoading, isError } = trpc.auth.getUserInfo.useQuery();

  return [data, error, isLoading, isError];
}
