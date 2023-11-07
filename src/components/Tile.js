import { useState, useEffect } from "react";
import fileIcon from "../icons/file.png";
import directoryIcon from "../icons/directory.png";
import Utility from "../../common/Utility";

const Tile = ({ id, metadata, updateData }) => {
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

  function showFileTextbox(parent) {
    if (!showAddFileTextBox) {
      return "";
    }
    return (
      <input
        type="text"
        className="input-add"
        placeholder="Press Enter to create File"
        data-parent={parent.id}
        onKeyUp={onFileTextboxKeyUp}
        autoFocus
      />
    );
  }

  function showDirectoryTextbox(parent) {
    if (!showAddDirectoryTextBox) {
      return "";
    }
    return (
      <input
        type="text"
        className="input-add"
        placeholder="Press Enter to create Directory"
        data-parent={parent.id}
        onKeyUp={onDirectoryTextboxKeyUp}
        autoFocus
      />
    );
  }

  function onFileTextboxKeyUp(event) {
    if (event.which != 13 || !event.target.value) {
      return;
    }

    const fileName = event.target.value;
    const parentId = event.target.dataset.parent;

    addTileElement(fileName, "file", parentId);
  }

  function addTileElement(name, type, parentId) {
    updateData((prevData) => {
      const newFile = {
        id: Utility.Guid(),
        metadata: { name: name, type: type },
        childrens: [],
      };
      const tileElement = getTileElement(prevData, parentId);
      tileElement.childrens = tileElement.childrens
        ? [...tileElement.childrens, newFile]
        : [newFile];
      setShowAddFileTextBox(false);
      setShowAddDirectoryTextBox(false);
      return JSON.parse(JSON.stringify(prevData));
    });
  }

  function getTileElement(data, parentId) {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.id === parentId) {
        return element;
      } else if (element.childrens) {
        return getTileElement(element.childrens, parentId);
      }
    }
  }

  function onDirectoryTextboxKeyUp(event) {
    if (event.which != 13 || !event.target.value) {
      return;
    }
    const directoryName = event.target.value;
    const parentId = event.target.dataset.parent;

    addTileElement(directoryName, "directory", parentId);
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
        {showFileTextbox({ id })}
        {showDirectoryTextbox({ id })}
      </div>
    </>
  );
};

export default Tile;
