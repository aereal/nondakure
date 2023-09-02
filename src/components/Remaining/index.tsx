"use client";
import { useState } from "react";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "../../ui";
import { RelativeTime } from "../RelativeTime";

export interface RemainingProps {
  remainingSeconds: number;
  fromTimeEpoch: number;
}

export function Remaining(props: RemainingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { remainingSeconds, fromTimeEpoch } = props;
  return (
    <Popover open={isOpen} placement="bottom" handler={setIsOpen}>
      <PopoverHandler>
        <Button variant="text">
          分解まであと
          {remainingSeconds / 60}分
        </Button>
      </PopoverHandler>
      <PopoverContent className="z-50 max-w-[24rem]">
        <Typography>
          <RelativeTime
            dateTime={new Date(fromTimeEpoch + remainingSeconds * 1000)}
          />
          に分解
        </Typography>
      </PopoverContent>
    </Popover>
  );
}
