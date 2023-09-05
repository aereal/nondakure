import { atom, selector } from "recoil";
import { defaultDrinks } from "../src/const";
import { decompositionSecondsPerGram } from "./const";
import type { DrunkDrink } from "./drunk-drink";

const drunkDrinksState = atom<DrunkDrink[]>({
  key: "DrunkDrinkArray",
  default: defaultDrinks.map((d) => ({ ...d, drunkVolume: 0 })),
});

const drunkTimeEpochState = atom<number>({
  key: "DrunkTimeEpoch",
  effects: [
    ({ setSelf }) => {
      setSelf(Date.now());
    },
  ],
});

const totalAlcholVolumeState = selector<number>({
  key: "TotalAlcholVolume",
  get({ get }) {
    const drinks = get(drunkDrinksState);
    return drinks.reduce<number>(
      (accum, drink) =>
        accum + drink.abv * drink.volumeMilliLitre * drink.drunkVolume,
      0
    );
  },
});

const decompositionRemainingSecondsState = selector<number>({
  key: "DecompositionRemainingSeconds",
  get({ get }) {
    const total = get(totalAlcholVolumeState);
    return total * decompositionSecondsPerGram;
  },
});

export {
  decompositionRemainingSecondsState,
  drunkDrinksState,
  drunkTimeEpochState,
  totalAlcholVolumeState,
};
