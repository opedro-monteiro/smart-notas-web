export function dateFormat(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;

  if (isNaN(date.getTime())) return "";

  const pad = (n: number) => String(n).padStart(2, "0");

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
