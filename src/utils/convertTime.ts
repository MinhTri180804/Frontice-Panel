function convertTimestampToVietnamTime(timestamp: number | null | string) {
  if (timestamp === null) return;
  const date = new Date(Number(timestamp) * 1000);
  const vietnamTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  return vietnamTime.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export { convertTimestampToVietnamTime };
