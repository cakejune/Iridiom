import { render } from "@testing-library/react";
import React, { useState } from "react";
import Cell from "./Cell";
import ElementModal from "./ElementModal";
import { Spinner } from "react-bootstrap";
import SearchResults from "../SearchResults/SearchResults";
import IdiomCategoryKey from "./IdiomCategoryKey";

export default function TableGrid({ elements }) {
  const [show, setShow] = useState(false);
  const [selectedElement, setSelectedElement] = useState(elements[0]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getLookupTable = () => {
    let newTable = {};
    for (const el of elements) {
      newTable[el.xy] = el;
    }
    return newTable;
  };

  // const matchTableLocation = {
  //   '0,0':1,

  // }

  function renderElement(element, coordinate) {
    if (!element) {
      return <div className="notRow" key={coordinate}></div>;
    } else {
      return (
        <Cell
          element={element}
          key={coordinate}
          handleClick={handleElementClick}
        />
        
        
      );
    }
  }

  function handleElementClick(element) {
    setSelectedElement(element);
    setShow(true);
  }

  function render() {
    const table = getLookupTable();
    const components = [];
    const width = 18;
    const height = 9;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const coordinate = `${x},${y}`;
        const element = table[coordinate];
        components.push(renderElement(element, coordinate));
      }
    }
    return components;
  }

  return (
    <>
      <ElementModal
        element={selectedElement}
        show={show}
        handleClose={handleClose}

      />
      {/* <IdiomCategoryKey/> */}
     
      <div className="tableGrid">{render()}</div>
    </>
  );
}

// <IdiomCategoryKey/>
