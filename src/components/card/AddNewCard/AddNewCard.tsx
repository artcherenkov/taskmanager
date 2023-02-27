import React from "react";
import IconButton from "@mui/material/IconButton";

import { AddIcon } from "../../icons";
import styles from "./AddNewCard.module.css";

interface IAddNewCard {
  disabled: boolean;
}

export const AddNewCard = ({ disabled }: IAddNewCard) => {
  return (
    <div className={styles.card}>
      <IconButton size="large" disabled={disabled}>
        <AddIcon size={32} color={disabled ? "#f1f1f1" : "#737373"} />
      </IconButton>
    </div>
  );
};
