import { ChangeEventHandler, MouseEventHandler } from "react";
import { Button, Input } from "../../ui";

export interface DrunkTimeProps {
  drunkAt: Date;
  setDrunkAt: (time: Date) => void;
}

const pattern = /^([0-9]{2}):([0-9]{2})$/;

const format = (d: Date): string => {
  const hours = d.getHours();
  const minutes = d.getMinutes();
  return `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
};

export function DrunkTime(props: DrunkTimeProps) {
  const { drunkAt, setDrunkAt } = props;
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const match = pattern.exec(event.target.value);
    if (match === null) {
      return;
    }
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const nd = new Date(
      drunkAt.getFullYear(),
      drunkAt.getMonth(),
      drunkAt.getDate(),
      hours,
      minutes
    );
    setDrunkAt(nd);
  };
  const handleResetClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setDrunkAt(new Date());
  };
  return (
    <div className="relative flex w-full max-w-[24rem]">
      <Input
        type="time"
        variant="static"
        label="飲酒時刻"
        className="pr-20"
        containerProps={{
          className: "min-w-0",
        }}
        value={format(drunkAt)}
        pattern="[0-9]{2}:[0-9]{2}"
        onChange={handleChange}
      />
      <Button
        size="sm"
        color="blue-gray"
        className="right-1 top-1 rounded"
        onClick={handleResetClick}
      >
        Reset
      </Button>
    </div>
  );
}
