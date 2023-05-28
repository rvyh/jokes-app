import { useState } from "react";
import axios from "axios";
import Form from "../common/form";
import ToggleTheme from "../common/toggleTheme";
import { useNavigate } from "react-router-dom";

export default function NewJoke() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [views, setViews] = useState("");
  /* Assuming CreatedAt can be an integer (Unix timestamp) or string (e.g. 2023/05/27)
  because that's what I've seen in the API when I started with this challenge */
  const [createdAt, setCreatedAt] = useState("");

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

  const handleSubmit = () => {
    let created;
    if (Number.isInteger(Number(createdAt))) {
      created = Number(createdAt);
    } else {
      created = createdAt;
    }

    // Assuming the backend adds an id
    const data = {
      Title: title,
      Body: body,
      Author: author,
      Views: Number(views),
      CreatedAt: created,
    };

    axios
      .post(`https://retoolapi.dev/zu9TVE/jokes`, data)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <ToggleTheme />
      <div style={{ marginTop: "8px" }}>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </div>
      <h1>Add a new joke</h1>
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
