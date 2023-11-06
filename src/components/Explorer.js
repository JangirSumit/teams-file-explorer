import Tile from "./Tile";

const Explorer = ({ data, updateData, parent = null }) => {
  if (!data || !data.length) {
    return "";
  }

  return (
    <div
      key={parent?.id}
      data-parent-id={parent?.id}
      className={parent ? "explorer padding-left-15" : "explorer"}
    >
      {data.map((d) => {
        return (
          <div key={d.id} className="elements">
            <Tile metadata={d.metadata} id={d.id} />
            <Explorer
              updateData={updateData}
              data={d.childrens}
              parent={d.id}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Explorer;
