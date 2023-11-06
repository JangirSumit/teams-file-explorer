import data from "../data/data.json";
import Explorer from "./components/Explorer";

const App = () => {
  return (
    <div className="container">
      <Explorer data={data} parent={null} />
    </div>
  );
};

export default App;
