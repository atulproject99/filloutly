import { trpc } from "~/trpc/client";

export default function useUser() {
  const { data, error, isLoading, isError } = trpc.auth.getUserInfo.useQuery(undefined, {
    retry: false, // Don't retry auth checks if unauthorized
  });

  return [data, error, isLoading, isError] as const;
}
