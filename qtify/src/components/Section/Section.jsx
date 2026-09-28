import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

const TOP_ALBUMS_URL =
  "https://qtify-backend.labs.crio.do/albums/top";

function Section() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios
      .get(TOP_ALBUMS_URL)
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error("Error fetching albums:", error);
      });
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Top Albums</h2>
        <button>Collapse</button>
      </div>

      <div className={styles.grid}>
        {albums.map((album) => (
          <Card
            key={album.id}
            image={album.image}
            follows={album.follows}
            title={album.title}
          />
        ))}
      </div>
    </section>
  );
}

export default Section;