import { styles } from "../styles/styles";

type CardProps = {
  name: string;
  url: string;
};

export default function Card({ name, url }: CardProps) {
  return (
    <a href={`https://${url}`} target="_blank" rel="noreferrer">
      <section className={styles.cardSection}>
        <h2 className={styles.cardTitle}>{name}</h2>
        <span className={styles.link}>{url}</span>
      </section>
    </a>
  );
}
