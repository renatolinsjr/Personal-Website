type LogInfo = Record<string, string | number | boolean | undefined | null>;

export const logError = async (error: Error, info?: LogInfo) => {
  if (process.env.NODE_ENV === "development") {
    console.error("DEBUG [Client Error]:", error, info);
    return;
  }

  try {
    await fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        url: window.location.href,
        info,
      }),
    });
  } catch {
    // Fail silently in production to avoid infinite loops or blocking user experience
  }
};
