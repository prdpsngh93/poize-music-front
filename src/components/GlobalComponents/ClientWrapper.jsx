"use client";

import { Toaster } from "sonner";

export default function ClientWrapper({ children }) {
 

  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
