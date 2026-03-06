import React from "react";
import styles from "./custom-stats-card.module.css";

type Props = {
  title: string;
  value: React.ReactNode;
};

function CustomStatsCard({ title, value }: Props) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.value}>{value}</p>
    </div>
  );
}

export default CustomStatsCard;
