// Возвращает разницу между двумя датами в днях, часах, минутах и секундах
export function getTimeDiff(from: Date, to: Date) {
  const diffMs = to.getTime() - from.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);
  return { days, hours, minutes, seconds };
} 