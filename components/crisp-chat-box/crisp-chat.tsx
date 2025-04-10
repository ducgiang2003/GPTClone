"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";
export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("d1fd8044-48ae-4f70-bc9e-7626e606538b");
  }, []);
  return null;
};
