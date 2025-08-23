"use client";

import { useEffect } from "react";
import { Toaster } from "sonner";

export default function ClientWrapper({ children }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
