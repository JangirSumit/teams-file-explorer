import { useState } from "react";
import directoryExpanderIcon from "../icons/collapse-expand.png";

const DirectoryExpander = ({ metadata }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (metadata.type !== "directory") {
    return "";
  }

  function onDirectoryExpanderClick(event) {
    event.target.dataset.isExpanded = !isExpanded;
    setIsExpanded((prevValue) => !prevValue);
  }

  return (
    <img
      src={directoryExpanderIcon}
      className={!isExpanded ? "rotate--90" : ""}
      data-isExpanded={isExpanded}
      onClick={onDirectoryExpanderClick}
    />
  );
};

export default DirectoryExpander;
