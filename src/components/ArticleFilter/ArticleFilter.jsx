import { useState } from "react";
import styles from "./ArticleFilter.module.css";

function ArticleFilter({
  sortBy,
  setSortBy,
  order,
  setOrder,
  searchParams,
  setSearchParams,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const params = new URLSearchParams(searchParams);

  return (
    <section className={styles.articleFilter}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <span>Filter</span>
        <span>{isOpen ? "▴" : "▾"}</span>
      </button>

      {isOpen && (
        <>
          <label htmlFor="sort_by">Sort By</label>
          <select
            id="sort_by"
            value={sortBy}
            onChange={({ target }) => {
              const sort_by = target.value;
              setSortBy(sort_by);
              params.set("sort_by", sort_by);
              setSearchParams(params);
            }}
          >
            <option value="created_at">Date</option>
            <option value="comment_count">Comments</option>
            <option value="votes">Votes</option>
          </select>

          <button
            onClick={() => {
              const sortingOrder = order === "asc" ? "desc" : "asc";
              setOrder(sortingOrder);
              params.set("order", sortingOrder);
              setSearchParams(params);
            }}
          >
            {order === "desc" ? "↑ Ascending" : "↓ Descending"}
          </button>
        </>
      )}
    </section>
  );
}
export default ArticleFilter;
