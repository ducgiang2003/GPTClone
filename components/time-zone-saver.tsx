"use client";
import { useEffect } from "react";
import axios from "axios";

export const TimezoneSaver = () => {
  useEffect(() => {
    const hasSaved = sessionStorage.getItem("timezoneSaved");

    if (!hasSaved) {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const saveTimezoneAndResetLimit = async () => {
        try {
          await axios.post("/api/saveTimeZone", { timezone });
          console.log("✅ Timezone saved!");

          await axios.post("/api/resetApiLimit");
          console.log("🔄 API limit reset!");

          sessionStorage.setItem("timezoneSaved", "true");
        } catch (err) {
          console.error("❌ Failed to save timezone or reset API limit:", err);
        }
      };

      saveTimezoneAndResetLimit();
    }
  }, []);

  return null;
};
