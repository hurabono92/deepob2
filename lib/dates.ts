// 원본 사이트의 날짜 표기 형식(예: "26.01.02")과 맞춘 포맷 유틸
export function formatShortDate(date: Date): string {
  const yy = String(date.getFullYear()).slice(2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yy}.${mm}.${dd}`;
}

// "26.01.02" 형식의 2자리 연도를 20xx년으로 해석해 Date로 변환
export function parseShortDate(value: string): Date {
  const [yy, mm, dd] = value.split(".").map(Number);
  return new Date(2000 + yy, mm - 1, dd);
}
