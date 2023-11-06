import fileIcon from "../icons/file.png";
import directoryIcon from "../icons/directory.png";

const Explorer = ({ data, parent = null }) => {
  if (!data || !data.length) {
    return "";
  }

  return (
    <div
      data-parent-id={parent?.id}
      className={parent ? "explorer padding-left-15" : "explorer"}
    >
      {data.map((d) => {
        return (
          <>
            <div data-id={d.id} data-type={d.metadata.type} key={d.id} className="tile">
              <span>
                <img
                  src={d.metadata.type === "file" ? fileIcon : directoryIcon}
                />
              </span>
              <span>{d.metadata.name}</span>
            </div>
            <Explorer data={d.childrens} parent={d.id} />
          </>
        );
      })}
    </div>
  );
};

export default Explorer;
