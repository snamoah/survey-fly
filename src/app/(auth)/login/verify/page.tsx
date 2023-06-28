"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { verifyLoginLink } from "./helpers";

const Page = () => {
  const router = useRouter();

  /**
   * Handle redirection client side
   */
  useEffect(() => {
    const handleLogin = async () => {
      const { error } = await verifyLoginLink();
      if (error) {
        router.replace("/login");
      }

      router.replace("/dashboard");
    };

    handleLogin();
  }, []);

  return <h1>Loading...</h1>;
};

export default Page;
