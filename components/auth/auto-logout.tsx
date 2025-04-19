"use client";
import { useClerk } from "@clerk/nextjs";
import { useEffect } from "react";


const AutoLogout = () => {
  const { signOut } = useClerk();
  useEffect(() => {
    const timeLogout = setTimeout(
      () => {
        signOut();
      },
      60 * 10 * 1000
    ); // 10 minutes
    return () => {
      clearTimeout(timeLogout);
    };
  }, []);
  return null;
};
export default AutoLogout;
