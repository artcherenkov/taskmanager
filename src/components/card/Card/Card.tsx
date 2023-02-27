import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import styles from "./Card.module.css";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  deleteTodo,
  selectEditingTodoId,
  setEditingTodoId,
  updateTodo,
} from "../../../store/appSlice";
import { TTodoItem } from "../../../types";
import { TestId } from "../../../test-ids";

interface ICardProps {
  todo: {
    id: string;
    title: string;
  };
}

export const Card = (props: ICardProps) => {
  const { todo } = props;

  const dispatch = useAppDispatch();
  const editingTodoId = useAppSelector(selectEditingTodoId);
  const isEditMode = editingTodoId === todo.id;

  const [showControls, setShowControls] = useState(false);
  const [todoData, setTodoData] = useState<Omit<TTodoItem, "id">>({
    title: todo.title,
  });

  const onMouseEnter = () => {
    setShowControls(true);
  };

  const onMouseLeave = () => {
    setShowControls(false);
  };

  const onTitleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTodoData({ ...todoData, [evt.target.name]: evt.target.value });
  };

  // Editing
  const onDoneClick = () => {
    dispatch(setEditingTodoId(null));
    if (todo.title !== todoData.title) {
      dispatch(updateTodo({ id: todo.id, ...todoData }));
    }
  };
  const onRestoreClick = () => {
    setTodoData(todo);
  };
  const onDeleteClick = () => {
    dispatch(deleteTodo(todo.id));
    if (!!editingTodoId) {
      dispatch(setEditingTodoId(null));
    }
  };
  const onEditClick = () => {
    dispatch(setEditingTodoId(todo.id));
  };

  const disableRestoreButton = todo.title === todoData.title;

  if (isEditMode) {
    return (
      <div className={styles.card} data-testid={TestId.EDIT_MODE_CARD}>
        <TextField
          label="Что сделать?"
          variant="standard"
          fullWidth
          name="title"
          value={todoData.title}
          onChange={onTitleChange}
        />
        <div className={styles.editButtons}>
          <IconButton onClick={onDeleteClick} title="Delete task">
            <DeleteIcon />
          </IconButton>
          {!!todo.title && (
            <IconButton
              onClick={onRestoreClick}
              disabled={disableRestoreButton}
              title="Restore task"
            >
              <RestoreIcon />
            </IconButton>
          )}
          <IconButton onClick={onDoneClick} title="Save task">
            <CheckIcon />
          </IconButton>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.card}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-testid={TestId.DEFAULT_CARD}
    >
      {showControls && (
        <div className={styles.controls}>
          <Typography
            variant="caption"
            component="a"
            className={styles.controlText}
            onClick={onEditClick}
          >
            Edit
          </Typography>
          <Typography
            variant="caption"
            component="a"
            className={styles.controlText}
            onClick={onDeleteClick}
          >
            Delete
          </Typography>
        </div>
      )}
      <Typography variant="subtitle1">{todo.title}</Typography>
    </div>
  );
};

export default Card;
