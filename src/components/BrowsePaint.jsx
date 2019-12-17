import React, { useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { PaintTile } from "./PaintTile";
import { ImageTile } from "./ImageTile";
import Config from "../ClientConfig";

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

  
  const [isRedirectingToHome] = useState(
    document.cookie.indexOf("HasSeenHomeScreen=true") === -1
  );
  useEffect(() => {
    const abortController = new AbortController();
    if (!isRedirectingToHome) {
      fetch(`${Config.BASE_API_URL}/api/paints?zip=12345`)
        .then(x => x.text())
        .then(t => {
          setPaintChips({ paintChips: JSON.parse(t) });
        });
    }

    return abortController.abort();
  }, [ isRedirectingToHome]);

  const homeStyle = {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap"
  };

  return isRedirectingToHome ? (
    <Redirect to="/Home" />
  ) : (
    <div>
      <h1>Available Paint</h1>
      <div style={homeStyle}>{theTiles}</div>

      <div>
        <Link to="/giveAwayPaint">I have paint to donate</Link>
      </div>
    </div>
  );
};

export default BrowsePaint;
