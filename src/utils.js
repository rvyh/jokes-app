/* Useful utilities */

// takes a date as an integer or string, and returns a date in format 25 May 2023
export function dateFormatter(inputDate) {
  let jokeDate = "";
  let date;

  if (Number.isInteger(inputDate)) {
    date = new Date(inputDate);
  } else if (typeof inputDate === "string") {
    date = new Date(inputDate.replace(/\//g, "-"));
  }

  if (date !== undefined)
    jokeDate = `${date.getDate()} ${date.toLocaleString("en-US", {
      month: "short",
    })} ${date.getFullYear()}`;

  return jokeDate;
}

// returns a color based on the number of views
export function getColor(views) {
  let color = "";
  
  if (views <= 25) color = "tomato";
  else if (views <= 50) color = "orange";
  else if (views <= 75) color = "yellow";
  else if (views <= 100) color = "green";
  
  return color;
}
