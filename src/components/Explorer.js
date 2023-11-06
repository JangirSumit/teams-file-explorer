import Tile from "./Tile";
import { useEffect, useState } from "react";

const Explorer = ({ data, parent = null }) => {
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
