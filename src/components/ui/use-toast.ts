"use client";

import { useCallback, useState } from "react";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = useCallback(({ title, description, variant }: ToastProps) => {
    // In a headless implementation, we'll log it.
    // In the real project, the Toaster component will consume this state.
    console.log(`[Toast] ${variant === "destructive" ? "❌" : "✅"} ${title}: ${description}`);
    
    // Fallback to alert if no UI is present and we're in the browser
    if (typeof window !== "undefined") {
      // Logic for alert fallback could go here if needed
    }
    
    setToasts((prev) => [...prev, { title, description, variant }]);
  }, []);

  return { toast, toasts };
}
