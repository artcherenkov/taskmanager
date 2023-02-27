import React from "react";
import IconButton from "@mui/material/IconButton";
import { nanoid } from "nanoid";

import { AddIcon } from "../../icons";
import styles from "./AddNewCard.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  createTodo,
  selectEditingTodoId,
  setEditingTodoId,
} from "../../../store/appSlice";
import { TestId } from "../../../test-ids";

const createEmptyTodo = () => ({
  id: nanoid(),
  title: "",
});

export const AddNewCard = () => {
  const dispatch = useAppDispatch();
  const editingTaskId = useAppSelector(selectEditingTodoId);
  const disabled = !!editingTaskId;

  const onClick = () => {
    const newTodo = createEmptyTodo();
    dispatch(createTodo(newTodo));
    dispatch(setEditingTodoId(newTodo.id));
  };

  return (
    <div className={styles.card} data-testid={TestId.ADD_NEW_CARD}>
      <IconButton size="large" disabled={disabled} onClick={onClick}>
        <AddIcon size={32} color={disabled ? "#f1f1f1" : "#737373"} />
      </IconButton>
    </div>
  );
};
