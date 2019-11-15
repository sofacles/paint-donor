import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { PaintTile } from "./PaintTile";
import { ImageTile } from "./ImageTile";
const BrowsePaint = () => {
  const [paintChips, setPaintChips] = useState({
    paintChips: [
      {
        rgb: "",
        brand: "",
        name: "",
        quantity: "",
        email: "",
        _id: "1"
      }
    ]
  });
  
  let theTiles = paintChips.paintChips.map(chip => {
    if (chip.imageName && chip.imageName.length > 3) {
      return <ImageTile key={chip._id} paintUnit={chip} />;
    }
    return <PaintTile key={chip._id} paintUnit={chip} />;
  });

  const abortController = new AbortController();
  useEffect(() => {
    fetch("/api/paints/1234")
      .then(x => x.text())
      .then(t => {
        setPaintChips({ paintChips: JSON.parse(t) });
      });

      return abortController.abort();
  }, [abortController]);
  const homeStyle = {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap"
  };

  const firstTime = document.cookie.indexOf("HasSeenHomeScreen=true")  === -1;
  return firstTime ? (
    <Redirect to="/Home" />
  ) : (
    <div>
      <h1>Available Paint</h1>
      <div style={homeStyle}>{theTiles}</div>
    </div>
  );
};

export default BrowsePaint;
