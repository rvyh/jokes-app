import React, { useState, useEffect } from "react";
import axios from "axios";
import { dateFormatter, getColor } from "../utils";
import ToggleTheme from "../common/toggleTheme";
import { Link } from "react-router-dom";

export default function Root() {
  const [jokes, setJokes] = useState([]);
  const [resultsPerPage, setResultsPerPage] = useState("5");
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://retoolapi.dev/zu9TVE/jokes/?_page=${page}&_limit=${resultsPerPage}`
      )
      .then((res) => {
        if (res.status === 200) setJokes(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page, resultsPerPage]);

  const handleResultsPerPage = (e) => {
    setResultsPerPage(e.target.value);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (jokes.length === Number(resultsPerPage)) setPage(page + 1);
  };

  return (
    <>
      <ToggleTheme />
      <p>buttons</p>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Created Date</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          {jokes.map((joke) => {
            const jokeAuthor = joke.Author?.replace(/@[a-z0-9-]+\./, "@***.");
            const jokeDate = dateFormatter(joke.CreatedAt);
            const color = getColor(joke.Views);

            return (
              <tr key={joke.id}>
                <td><Link to={`joke/${joke.id}`}>{joke.Title}</Link></td>
                <td>{jokeAuthor}</td>
                <td>{jokeDate}</td>
                <td>
                  <span style={{ color }}>{joke.Views}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ marginTop: "12px" }}>
        <button
          type="button"
          onClick={handlePrev}
        >
          {'<'}
        </button>
        <button
          type="button"
          onClick={handleNext}
          style={{ marginLeft: "8px" }}
        >
          {'>'}
        </button>
        <select
          value={resultsPerPage}
          onChange={handleResultsPerPage}
          style={{ marginLeft: "8px" }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
    </>
  );
}
