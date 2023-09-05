"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { ChangeEventHandler, MouseEventHandler } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { drunkDrinksState, totalAlcholVolumeState } from "../src/atoms";
import { DrunkTime } from "../src/components/DrunkTime";
import { Remaining } from "../src/components/Remaining";
import { Button, Card, CardBody, Input, Typography } from "../src/ui";

export default function Home() {
  const [drinks, setDrinks] = useRecoilState(drunkDrinksState);
  const totalAlcholVolume = useRecoilValue(totalAlcholVolumeState);
  const buildChangeDrunkVolumeHandler =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (event) => {
      event.preventDefault();
      setDrinks((prev) =>
        prev.map((d, i) =>
          i === index ? { ...d, drunkVolume: event.target.valueAsNumber } : d
        )
      );
    };
  const buildChangeABVHandler =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (event) => {
      event.preventDefault();
      const val = event.target.valueAsNumber;
      setDrinks((prev) =>
        prev.map((d, i) => (i === index ? { ...d, abv: val } : d))
      );
    };
  const buildChangeVolumeHandler =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (event) => {
      event.preventDefault();
      const val = event.target.valueAsNumber;
      setDrinks((prev) =>
        prev.map((d, i) => (i === index ? { ...d, volumeMilliLitre: val } : d))
      );
    };
  const handleAddClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setDrinks((prev) => [
      ...prev,
      { name: "", abv: 0, volumeMilliLitre: 0, drunkVolume: 0 },
    ]);
  };
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Card className="rounded-none w-full">
        <CardBody>
          <Typography variant="h1" className="mb-12 text-4xl">
            アルコール分解時間
          </Typography>
          <div className="w-full">
            <DrunkTime />
          </div>
          <div className="mt-12 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-8">
              <Typography variant="h2" className="text-2xl">
                飲んだ酒
              </Typography>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button size="sm" onClick={handleAddClick}>
                  <PlusIcon strokeWidth={4} className="h-6 w-6" />
                </Button>
              </div>
            </div>
            {drinks.map((drink, i) => (
              <div key={i} className="flex flex-col gap-2 my-3">
                <Input type="text" label="名前" defaultValue={drink.name} />
                <div className="flex flex-row gap-2 justify-between w-full">
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    label="ABV"
                    icon={<Typography variant="small">%</Typography>}
                    defaultValue={drink.abv}
                    containerProps={{ className: "min-w-[30%] max-w-[30%]" }}
                    onChange={buildChangeABVHandler(i)}
                  />
                  <Input
                    type="number"
                    label="量"
                    icon={<Typography variant="small">ml</Typography>}
                    defaultValue={drink.volumeMilliLitre}
                    containerProps={{ className: "min-w-[30%] max-w-[30%]" }}
                    onChange={buildChangeVolumeHandler(i)}
                  />
                  <Input
                    type="number"
                    label="数量"
                    defaultValue={0}
                    min={0}
                    containerProps={{ className: "min-w-[30%] max-w-[30%]" }}
                    onChange={buildChangeDrunkVolumeHandler(i)}
                  />
                </div>
              </div>
            ))}
          </div>
          <Typography>
            総アルコール量:{" "}
            <strong className="font-bold">{totalAlcholVolume}</strong>g
          </Typography>
          {totalAlcholVolume === 0 ? null : (
            <Card>
              <CardBody>
                <Remaining />
              </CardBody>
            </Card>
          )}
        </CardBody>
      </Card>
    </main>
  );
}
