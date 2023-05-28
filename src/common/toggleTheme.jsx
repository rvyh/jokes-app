import React, { useState, useEffect } from "react";

export default function ToggleTheme() {
  const [theme, setTheme] = useState("light");
  const [checked, setChecked] = useState(false);
  
  const toggleTheme = () => {
    if (checked) {
      setTheme("light");
      setChecked(false);
    } else {
      setTheme("dark");
      setChecked(true);
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  
  return (
    <div>
      <input type="checkbox" id="themeToggle" checked={checked} onChange={toggleTheme} />
      <label htmlFor="themeToggle">Dark</label>
    </div>
  );
} 
