"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useUser from "~/hooks/useUser";

export function AuthRedirect() {
  const [data, , isLoading] = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && data) {
      if (data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  }, [data, isLoading, router]);

  return null;
}
