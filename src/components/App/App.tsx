import React from "react";
import { nanoid } from "nanoid";

import { AddNewCard, Card } from "../card";
import styles from "./App.module.css";

type TCardData = { id: string; title: string };
const data: TCardData[] = [
  { id: nanoid(), title: "Сходить погулять" },
  { id: nanoid(), title: "Выпить таблетки" },
  { id: nanoid(), title: "Почесать репу" },
  { id: nanoid(), title: "Покормить собаку" },
  { id: nanoid(), title: "Купить хлеб" },
  { id: "1", title: "" },
];

export const App = () => {
  const editingTaskId = "1";

  return (
    <div className={styles.root}>
      {data.map((d) => (
        <Card key={d.id} {...d} isEditMode={editingTaskId === d.id} />
      ))}
      <AddNewCard disabled={!!editingTaskId} />
    </div>
  );
};
