import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type RecordState = "idle" | "recording" | "processing";

export default function ScreenRecorder() {
  const [state, setState] = useState<RecordState>("idle");
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const start = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 60 },
        audio: true,
      });

      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : "video/webm";

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        setState("processing");
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
        a.href = url;
        a.download = `aya-core-${timestamp}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        setState("idle");
        // clean up tracks
        stream.getTracks().forEach((t) => t.stop());
      };

      // If the user stops sharing via the browser's native UI
      stream.getVideoTracks()[0].onended = () => {
        if (recorder.state !== "inactive") recorder.stop();
      };

      recorder.start();
      setState("recording");
    } catch (err) {
      // User cancelled the picker — not an error worth showing
      if (err instanceof DOMException && err.name === "NotAllowedError") return;
      setError("Screen capture not supported in this browser.");
      setState("idle");
    }
  }, []);

  const stop = useCallback(() => {
    mediaRecorderRef.current?.stop();
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="rounded-lg border border-hotpink/30 bg-charcoal px-3 py-2 font-mono text-[10px] text-hotpink shadow-lg"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        onClick={state === "recording" ? stop : start}
        disabled={state === "processing"}
        title={state === "recording" ? "Stop recording" : "Record screen"}
        aria-label={state === "recording" ? "Stop recording" : "Start screen recording"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`group relative flex h-10 w-10 items-center justify-center rounded-full border shadow-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
          state === "recording"
            ? "border-hotpink bg-hotpink text-white shadow-[0_0_20px_rgba(248,18,149,0.5)]"
            : "border-white/15 bg-charcoal text-white/50 hover:border-hotpink/60 hover:text-hotpink"
        }`}
      >
        {state === "processing" ? (
          // spinner
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="40 20" />
          </svg>
        ) : state === "recording" ? (
          // stop square
          <span className="h-3 w-3 rounded-sm bg-white" />
        ) : (
          // record dot
          <span className="h-3 w-3 rounded-full bg-hotpink group-hover:shadow-[0_0_8px_rgba(248,18,149,0.8)] transition-shadow" />
        )}

        {/* Pulsing ring when recording */}
        {state === "recording" && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-hotpink animate-ping opacity-40"
          />
        )}
      </motion.button>

      {/* Tooltip label */}
      <AnimatePresence>
        {state === "recording" && (
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            className="font-mono text-[9px] uppercase tracking-[0.2em] text-hotpink"
          >
            recording
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
