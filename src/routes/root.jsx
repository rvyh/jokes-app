import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { dateFormatter, getColor } from "../utils";
import ToggleTheme from '../toggleTheme';

export default function Root() {
  const { jokes } = useLoaderData();

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
                <td>{joke.Title}</td>
                <td>{jokeAuthor}</td>
                <td>{jokeDate}</td>
                <td><span style={{ color }}>{joke.Views}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export async function loader() {
  let jokes = [];

  try {
    const res = await axios.get("https://retoolapi.dev/zu9TVE/jokes");
    if (res.status === 200) jokes = res.data;
  } catch (error) {
    console.error(error);
  }

  return { jokes };
}
