"use client";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import {
  decompositionRemainingSecondsState,
  drunkTimeEpochState,
} from "../../atoms";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "../../ui";
import { RelativeTime } from "../RelativeTime";

export function Remaining() {
  const remainingSeconds = useRecoilValue(decompositionRemainingSecondsState);
  const currentTime = useRecoilValue(drunkTimeEpochState);
  const [isOpen, setIsOpen] = useState(false);
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
            dateTime={new Date(currentTime + remainingSeconds * 1000)}
          />
          に分解
        </Typography>
      </PopoverContent>
    </Popover>
  );
}
