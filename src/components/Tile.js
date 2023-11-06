import { useState, useEffect } from "react";
import fileIcon from "../icons/file.png";
import directoryIcon from "../icons/directory.png";

const Tile = ({ id, metadata }) => {
  useEffect(() => {
    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  });

  function onDocumentClick(event) {
    if (
      event.target.classList?.contains("input-add") == false &&
      event.target.classList?.contains("button-add") == false
    ) {
      setShowAddFileTextBox(false);
      setShowAddDirectoryTextBox(false);
    }
  }

  const [showAddFileTextBox, setShowAddFileTextBox] = useState(false);
  const [showAddDirectoryTextBox, setShowAddDirectoryTextBox] = useState(false);

  function getTileClassName(type) {
    return type === "file" ? "tile file" : "tile directory";
  }

  function getIcon(type) {
    return type === "file" ? fileIcon : directoryIcon;
  }

  function onAddDirectoryClick() {
    setShowAddDirectoryTextBox(true);
  }

  function onAddFileClick() {
    setShowAddFileTextBox(true);
  }

  function getButtons(type) {
    if (type === "directory") {
      return (
        <>
          <button onClick={onAddFileClick} className="button-add">
            add file
          </button>
          <button onClick={onAddDirectoryClick} className="button-add">
            add directory
          </button>
        </>
      );
    }
    return "";
  }

  function showFileTextbox(params) {
    if (!showAddFileTextBox) {
      return "";
    }
    return <input type="text" className="input-add" />;
  }

  function showDirectoryTextbox(params) {
    if (!showAddDirectoryTextBox) {
      return "";
    }
    return <input type="text" className="input-add" />;
  }

  return (
    <>
      <div
        data-id={id}
        data-type={metadata.type}
        key={id}
        className={getTileClassName(metadata.type)}
      >
        <span>
          <img src={getIcon(metadata.type)} />
        </span>
        <span>{metadata.name}</span>
        {getButtons(metadata.type)}
      </div>

      <div className="show-textboxes">
        {showFileTextbox()}
        {showDirectoryTextbox()}
      </div>
    </>
  );
};

export default Tile;
