import { createContext, useState } from "react";
import initialData from "../data/data.json";
import Explorer from "./components/Explorer";

const App = () => {
  const [data, setData] = useState(initialData);

  return (
    <div className="container">
      <Explorer data={data} parent={null} updateData={setData} />
    </div>
  );
};

export default App;
