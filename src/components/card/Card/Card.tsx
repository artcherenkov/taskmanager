import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import styles from "./Card.module.css";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteIcon from "@mui/icons-material/Delete";

interface ICardProps {
  id: string;
  title: string;
  isEditMode?: boolean;
}

export const Card = (props: ICardProps) => {
  const { title, isEditMode = false } = props;

  const [showControls, setShowControls] = useState(false);

  const onMouseEnter = () => {
    setShowControls(true);
  };

  const onMouseLeave = () => {
    setShowControls(false);
  };

  if (isEditMode) {
    return (
      <div className={styles.card}>
        <TextField label="Что сделать?" variant="standard" fullWidth />
        <div className={styles.editButtons}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
          {!!title && (
            <IconButton>
              <RestoreIcon />
            </IconButton>
          )}
          <IconButton>
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
    >
      {showControls && (
        <div className={styles.controls}>
          <Typography variant="caption" className={styles.controlText}>
            Edit
          </Typography>
          <Typography variant="caption" className={styles.controlText}>
            Delete
          </Typography>
        </div>
      )}
      <Typography variant="subtitle1">{title}</Typography>
    </div>
  );
};

export default Card;
