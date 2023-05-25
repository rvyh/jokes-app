import { useLoaderData } from "react-router-dom";
import axios from "axios";

export default function Root() {
  const { jokes } = useLoaderData();

  return (
    <>
      <p>dark mode toggle</p>
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
            
            let jokeDate = "";
            let date;
            if (Number.isInteger(joke.CreatedAt)) {
              date = new Date(joke.CreatedAt);
            } else if (typeof joke.CreatedAt === "string") {
              date = new Date(joke.CreatedAt.replace(/\//g, "-"));
            }
            if (date !== undefined)
              jokeDate = `${date.getDate()} ${date.toLocaleString("en-US", {
                month: "short",
              })} ${date.getFullYear()}`;
            
            let color = "";
            if (joke.Views <= 25) color = "tomato"
            else if (joke.Views <= 50) color = "orange"
            else if (joke.Views <= 75) color = "yellow"
            else if (joke.Views <= 100) color = "green"

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
