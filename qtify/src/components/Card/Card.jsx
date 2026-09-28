import React from "react";
import Chip from "@mui/material/Chip";
import styles from "./Card.module.css";

function Card({ image, follows, title }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} />

        <Chip
          label={`${follows} Follows`}
          size="small"
          className={styles.chip}
        />
      </div>

      <p>{title}</p>
    </div>
  );
}

export default Card;