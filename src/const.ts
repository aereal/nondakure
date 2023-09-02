import { HardDrink } from "./hard-drink";

export const decompositionSecondsPerGram = 60 * 12;

export const defaultDrinks: Array<HardDrink> = [
  { name: "ビール 350ml", abv: 0.05, volumeMilliLitre: 350 },
  {
    name: "ビール 中瓶",
    abv: 0.05,
    volumeMilliLitre: 500,
  },
  { name: "ハイボール 1缶", abv: 0.07, volumeMilliLitre: 350 },
  {
    name: "グラスワイン",
    abv: 0.12,
    volumeMilliLitre: 120,
  },
  { name: "日本酒 1合", abv: 0.15, volumeMilliLitre: 180 },
  { name: "焼酎 1杯", abv: 0.25, volumeMilliLitre: 100 },
];
