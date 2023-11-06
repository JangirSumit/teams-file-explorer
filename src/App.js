import data from "../data/data.json";
import Explorer from "./components/Explorer";

const App = () => {

    console.log(data)
  return (
    <div className="container">
      <Explorer data={data} parent={null} />
    </div>
  );
};

export default App;
