import plural from "../../utils/plural";

export default function TimeDisplay({ diff, loading }: { diff: { days: number; hours: number; minutes: number; seconds: number }, loading: boolean }) {
  if (loading || (diff.days === 0 && diff.hours === 0 && diff.minutes === 0 && diff.seconds === 0)) {
    return <>Загрузка...</>;
  }
  return (
    <>
      {diff.days > 0 && `${diff.days} ${plural(diff.days, ["день", "дня", "дней"])} `}
      {diff.hours > 0 && `${diff.hours} ${plural(diff.hours, ["час", "часа", "часов"])} `}
      {diff.minutes > 0 && `${diff.minutes} ${plural(diff.minutes, ["минута", "минуты", "минут"])} `}
      {diff.seconds > 0 && `${diff.seconds} ${plural(diff.seconds, ["секунда", "секунды", "секунд"])}`}
    </>
  );
} 