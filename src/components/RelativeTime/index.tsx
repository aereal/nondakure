export type FormatDateFn = (remaining: number) => string;

export interface DateTimeProps {
  dateTime: Date;
  sinceFn?: () => Date;
  format?: FormatDateFn;
}

const fmt = new Intl.RelativeTimeFormat("default");
const defaultFormatter: FormatDateFn = (durationSeconds) =>
  fmt.format(durationSeconds, "seconds");

const getNow = () => new Date();

export function RelativeTime(props: DateTimeProps) {
  const { dateTime } = props;
  const since = (props.sinceFn ?? getNow)();
  const format = props.format ?? defaultFormatter;
  const remainingSeconds = (dateTime.valueOf() - since.valueOf()) / 1000;
  return (
    <time dateTime={dateTime.toISOString()}>{format(remainingSeconds)}</time>
  );
}
