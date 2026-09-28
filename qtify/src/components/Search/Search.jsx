import React from "react";
import styles from "./Search.module.css";
import SearchIcon from "../../assets/search-icon.svg";
import { useNavigate } from "react-router-dom";

function Search({ placeholder }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ position: "relative" }}>
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <input
          name="album"
          className={styles.search}
          placeholder={placeholder || "Search for songs or albums"}
        />

        <button className={styles.searchButton} type="submit">
          <img src={SearchIcon} alt="Search" />
        </button>
      </form>
    </div>
  );
}

export default Search;