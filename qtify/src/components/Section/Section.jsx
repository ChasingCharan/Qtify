import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

const TOP_ALBUMS_URL =
  "https://qtify-backend.labs.crio.do/albums/top";

const NEW_ALBUMS_URL =
  "https://qtify-backend.labs.crio.do/albums/new";

const SONGS_URL =
  "https://qtify-backend.labs.crio.do/songs";

function Section() {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

  const [topShowAll, setTopShowAll] = useState(false);
  const [newShowAll, setNewShowAll] = useState(false);

  const [topStart, setTopStart] = useState(0);
  const [newStart, setNewStart] = useState(0);

  useEffect(() => {
    // Top Albums
    axios
      .get(TOP_ALBUMS_URL)
      .then((response) => {
        setTopAlbums(response.data);
      })
      .catch((error) => {
        console.error("Top albums error:", error);
      });

    // New Albums
    axios
      .get(NEW_ALBUMS_URL)
      .then((response) => {
        setNewAlbums(response.data);
      })
      .catch((error) => {
        console.error("New albums error:", error);
      });

    // Songs
    axios
      .get(SONGS_URL)
      .then((response) => {
        setSongs(response.data);
      })
      .catch((error) => {
        console.error("Songs error:", error);
      });
  }, []);

  /*
   * We show 7 albums at a time in the slider.
   * The slider moves 2 cards at a time.
   */
    const visibleTopAlbums = topAlbums;
    const visibleNewAlbums = newAlbums;

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
      {/* ================= TOP ALBUMS ================= */}
      <section className={styles.section}>
        <div className={styles.header}>
          <h2>Top Albums</h2>

          <button
            className={styles.actionButton}
            onClick={() => setTopShowAll(!topShowAll)}
          >
            {topShowAll ? "Collapse" : "Show All"}
          </button>
        </div>

        {topShowAll ? (
          <div className={styles.allGrid}>
            {topAlbums.map((album) => (
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
            <div
                className={styles.grid}
                style={{
                    transform: `translateX(-${topStart * 180}px)`,
                }}
                >
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
        )}
      </section>

      {/* ================= NEW ALBUMS ================= */}
      <section className={styles.section}>
        <div className={styles.header}>
          <h2>New Albums</h2>

          <button
            className={styles.actionButton}
            onClick={() => setNewShowAll(!newShowAll)}
          >
            {newShowAll ? "Collapse" : "Show All"}
          </button>
        </div>

        {newShowAll ? (
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
            <div
                className={styles.grid}
                style={{
                    transform: `translateX(-${newStart * 180}px)`,
                }}
                >
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

      {/* ================= SONGS ================= */}
      <section className={styles.section}>
        <div className={styles.header}>
          <h2>Songs</h2>
        </div>

        <div className={styles.songGrid}>
          {songs.map((song) => (
            <div className={styles.songCard} key={song.id}>
              <img
                src={song.image}
                alt={song.title}
              />

              <p>{song.title}</p>

              <span>
                {song.artists &&
                  song.artists
                    .map((artist) => artist.name)
                    .join(", ")}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Section;