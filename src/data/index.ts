import { nanoid } from "nanoid";
import { TTodoItem } from "../types";

export const data: TTodoItem[] = [
  { id: nanoid(), title: "Сходить погулять" },
  { id: nanoid(), title: "Выпить таблетки" },
  { id: nanoid(), title: "Почесать репу" },
  { id: nanoid(), title: "Покормить собаку" },
  { id: nanoid(), title: "Купить хлеб" },
];
