export default function Form(props) {
  const {
    title,
    handleTitle,
    body,
    handleBody,
    author,
    handleAuthor,
    views,
    handleViews,
    createdAt,
    handleCreatedAt,
    submit,
  } = props;

  return (
    <>
      <div style={{ marginTop: "8px" }}>
        <label htmlFor="Title">Title: </label>
        <input
          type="text"
          size="30"
          id="Title"
          value={title}
          onChange={handleTitle}
        ></input>
      </div>

      <div style={{ marginTop: "8px" }}>
        <label htmlFor="Body">Body: </label>
        <textarea
          rows="4"
          cols="50"
          id="Body"
          value={body}
          onChange={handleBody}
        ></textarea>
      </div>

      <div style={{ marginTop: "8px" }}>
        <label htmlFor="Author">Author: </label>
        <input
          type="text"
          size="30"
          id="Author"
          value={author}
          onChange={handleAuthor}
        ></input>
      </div>

      <div style={{ marginTop: "8px" }}>
        <label htmlFor="Views">Views: </label>
        <input
          type="number"
          min="0"
          id="Views"
          value={views}
          onChange={handleViews}
        ></input>
      </div>

      <div style={{ marginTop: "8px" }}>
        <label htmlFor="CreatedAt">CreatedAt: </label>
        <input
          type="text"
          size="30"
          id="CreatedAt"
          value={createdAt}
          onChange={handleCreatedAt}
        ></input>
      </div>

      <button type="button" onClick={submit} style={{ marginTop: "8px" }}>
        Submit
      </button>
    </>
  );
}
