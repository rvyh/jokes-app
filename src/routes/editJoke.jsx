import { useEffect, useState } from "react";
import axios from "axios";
import Form from "../common/form";
import ToggleTheme from "../common/toggleTheme";
import { useParams, useNavigate } from "react-router-dom";
import Auth from "../common/Auth";

export default function EditJoke() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [joke, setJoke] = useState({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [views, setViews] = useState("");
  /* Assuming CreatedAt can be an integer (Unix timestamp) or string (e.g. 2023/05/27)
  because that's what I've seen in the API when I started with this challenge */
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    axios
      .get(`https://retoolapi.dev/zu9TVE/jokes/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setJoke(res.data);
          setTitle(typeof res.data.Title === "string" ? res.data.Title : "");
          setBody(typeof res.data.Body === "string" ? res.data.Body : "");
          setAuthor(typeof res.data.Author === "string" ? res.data.Author : "");
          setViews(typeof res.data.Views !== "undefined" ? res.data.Views : "");
          setCreatedAt(
            typeof res.data.CreatedAt !== "undefined" ? res.data.CreatedAt : ""
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleBody = (e) => {
    setBody(e.target.value);
  };

  const handleAuthor = (e) => {
    setAuthor(e.target.value);
  };

  const handleViews = (e) => {
    setViews(e.target.value);
  };

  const handleCreatedAt = (e) => {
    setCreatedAt(e.target.value);
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleDelete = () => {
    axios
      .delete(`https://retoolapi.dev/zu9TVE/jokes/${id}`)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = () => {
    let created;
    if (Number.isInteger(Number(createdAt))) {
      created = Number(createdAt);
    } else {
      created = createdAt;
    }

    const data = {
      ...joke,
      Title: title,
      Body: body,
      Author: author,
      Views: Number(views),
      CreatedAt: created,
    };

    axios
      .put(`https://retoolapi.dev/zu9TVE/jokes/${id}`, data)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Auth />
      <ToggleTheme />
      <div style={{ marginTop: "8px" }}>
        <button type="button" onClick={handleClose}>
          Close
        </button>
        <button
          type="button"
          onClick={handleDelete}
          style={{ marginLeft: "8px" }}
        >
          Delete
        </button>
      </div>
      <h1>Edit/Delete</h1>
      <Form
        title={title}
        handleTitle={handleTitle}
        body={body}
        handleBody={handleBody}
        author={author}
        handleAuthor={handleAuthor}
        views={views}
        handleViews={handleViews}
        createdAt={createdAt}
        handleCreatedAt={handleCreatedAt}
        submit={handleSubmit}
      />
    </>
  );
}
