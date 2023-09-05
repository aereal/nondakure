import type { HardDrink } from "./hard-drink";

export interface DrunkDrink extends HardDrink {
  readonly drunkVolume: number;
}
