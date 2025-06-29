import plural from "../../utils/plural";

export default function TimeDisplay({ diff, loading }: { diff: { days: number; hours: number; minutes: number; seconds: number }, loading: boolean }) {
  if (loading || (diff.days === 0 && diff.hours === 0 && diff.minutes === 0 && diff.seconds === 0)) {
    return <>Загрузка...</>;
  }

  const parts = [];
  if (diff.days > 0) parts.push(`${diff.days} ${plural(diff.days, ["день", "дня", "дней"])}`);
  if (diff.hours > 0) parts.push(`${diff.hours} ${plural(diff.hours, ["час", "часа", "часов"])}`);
  if (diff.minutes > 0) parts.push(`${diff.minutes} ${plural(diff.minutes, ["минута", "минуты", "минут"])}`);
  if (diff.seconds > 0) parts.push(`${diff.seconds} ${plural(diff.seconds, ["секунда", "секунды", "секунд"])}`);

  let display = "";
  if (parts.length === 1) {
    display = parts[0];
  } else if (parts.length === 2) {
    display = parts.join(" и ");
  } else if (parts.length > 2) {
    display = parts.slice(0, -1).join(" ") + " и " + parts[parts.length - 1];
  }

  return <>{display}</>;
} 