import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectTodos, setTodos } from "../../store/appSlice";
import { data } from "../../data";
import { AddNewCard, Card } from "../card";
import styles from "./App.module.css";

export const App = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);

  useEffect(() => {
    dispatch(setTodos(data));
  }, []);

  return (
    <div className={styles.root}>
      {todos.map((t) => (
        <Card key={t.id} todo={t} />
      ))}
      <AddNewCard />
    </div>
  );
};
