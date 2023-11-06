import Tile from "./Tile";
import { useEffect, useState } from "react";

const Explorer = ({ data, parent = null }) => {
  const [showAddFileTextBox, setShowAddFileTextBox] = useState(false);
  const [showAddDirectoryTextBox, setShowAddDirectoryTextBox] = useState(false);

  //   useEffect(() => {
  //     document.addEventListener("click", onDocumentClick);
  //     return () => document.removeEventListener("click", onDocumentClick);
  //   });

  //   function onDocumentClick(event) {
  //     if (
  //       event.target.classList?.contains("input-add") == false &&
  //       event.target.classList?.contains("button-add") == false
  //     ) {
  //       setShowAddFileTextBox(false);
  //       setShowAddDirectoryTextBox(false);
  //     }
  //   }

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
          <>
            <Tile metadata={d.metadata} id={d.id} />
            <Explorer data={d.childrens} parent={d.id} key={d.metadata.id} />
          </>
        );
      })}
    </div>
  );
};

export default Explorer;
