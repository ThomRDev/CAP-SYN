import { useState } from "react";

export const ButtonComponent = () => {
  const [text, setText] = useState("Antes del clic");

  const handleClick = () => {
    setTimeout(() => {
      setText("Después del clic");
    }, 1000);
  };

  return <button onClick={handleClick}>{text}</button>;
};
