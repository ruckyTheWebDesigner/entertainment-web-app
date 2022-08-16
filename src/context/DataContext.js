import { createContext, useState } from "react";
import cardData from "../assets/data";

export const movieContext = createContext();

function DataContext({ children }) {
  const [data, setData] = useState(cardData);
  return (
    <movieContext.Provider value={[data, setData]}>
      {children}
    </movieContext.Provider>
  );
}

export default DataContext;
