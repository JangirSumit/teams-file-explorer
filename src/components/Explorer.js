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
      {data
        .sort((a, b) => b.metadata.name - a.metadata.name)
        .map((d) => {
          return (
            <div key={d.id} className="elements">
              <Tile
                metadata={d.metadata}
                id={d.id}
                data={data}
                updateData={updateData}
              />
              {d.childrens && d.childrens.length ? (
                <Explorer
                  updateData={updateData}
                  data={d.childrens}
                  parent={d.id}
                />
              ) : (
                ""
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Explorer;
