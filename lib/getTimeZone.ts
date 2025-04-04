import axios from "axios";

export const saveTimeZone = async () => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const res = await axios.post("/api/saveTimeZone", { timezone });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lưu timezone:", error);
    throw error;
  }
};
