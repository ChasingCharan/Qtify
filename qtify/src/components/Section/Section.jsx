import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

const TOP_ALBUMS_URL =
  "https://qtify-backend.labs.crio.do/albums/top";

const NEW_ALBUMS_URL =
  "https://qtify-backend.labs.crio.do/albums/new";

function Section() {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);

  const [showAll, setShowAll] = useState(false);

  const [topStart, setTopStart] = useState(0);
  const [newStart, setNewStart] = useState(0);

  useEffect(() => {
    axios.get(TOP_ALBUMS_URL)
      .then((response) => {
        setTopAlbums(response.data);
      })
      .catch((error) => {
        console.error("Top albums error:", error);
      });

    axios.get(NEW_ALBUMS_URL)
      .then((response) => {
        setNewAlbums(response.data);
      })
      .catch((error) => {
        console.error("New albums error:", error);
      });
  }, []);

  const visibleTopAlbums = topAlbums.slice(
    topStart,
    topStart + 7
  );

  const visibleNewAlbums = newAlbums.slice(
    newStart,
    newStart + 7
  );

  const handleTopNext = () => {
    if (topStart + 7 < topAlbums.length) {
      setTopStart(topStart + 2);
    }
  };

  const handleNewNext = () => {
    if (newStart + 7 < newAlbums.length) {
      setNewStart(newStart + 2);
    }
  };

  return (
    <>
      {/* TOP ALBUMS */}
      <section className={styles.section}>
        <div className={styles.header}>
          <h2>Top Albums</h2>

          <button
            className={styles.actionButton}
            onClick={() => setTopStart(0)}
          >
            Collapse
          </button>
        </div>

        <div className={styles.sliderContainer}>
          <div className={styles.grid}>
            {visibleTopAlbums.map((album) => (
              <Card
                key={album.id}
                image={album.image}
                follows={album.follows}
                title={album.title}
              />
            ))}
          </div>

          <button
            className={styles.nextButton}
            aria-label="next"
            onClick={handleTopNext}
          >
            &gt;
          </button>
        </div>
      </section>

      {/* NEW ALBUMS */}
      <section className={styles.section}>
        <div className={styles.header}>
          <h2>New Albums</h2>

          <button
            className={styles.actionButton}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Collapse" : "Show All"}
          </button>
        </div>

        {showAll ? (
          <div className={styles.allGrid}>
            {newAlbums.map((album) => (
              <Card
                key={album.id}
                image={album.image}
                follows={album.follows}
                title={album.title}
              />
            ))}
          </div>
        ) : (
          <div className={styles.sliderContainer}>
            <div className={styles.grid}>
              {visibleNewAlbums.map((album) => (
                <Card
                  key={album.id}
                  image={album.image}
                  follows={album.follows}
                  title={album.title}
                />
              ))}
            </div>

            <button
              className={styles.nextButton}
              aria-label="next"
              onClick={handleNewNext}
            >
              &gt;
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default Section;