import React from "react";
import { Link } from "react-router-dom";
import BucketIcon from "./BucketIcon";

const Home = () => {
  //OK, they will have seen this once, I can set a cookie so the default page is BrowsePaint
  document.cookie = "HasSeenHomeScreen=true";
  return (
    <>
      <h1>Scrap Paint Exchange</h1>

      <BucketIcon />
      <p>
        You've finished painting and there's half a gallon of paint left. You
        can't take it back to the paint store because it's already been tinted.
        You could dispose of it, but that's complicated too. The proper way to
        do that is to take the lid off and let the water evaporate out of the
        paint, which takes approximately forever.
      </p>

      <p>What to do?</p>

      <p>
        This web app is a way to connect people who would like to be rid of
        paint with people who are about to start a painting project using the
        same color.
      </p>

      <div className="home-button-holder">
        <Link to="/giveawaypaint" className="jumbo-button">
          <span> I want to give away paint </span>
        </Link>

        <Link to="/browsepaint" className="jumbo-button">
          <span> I'm looking for paint</span>
        </Link>
      </div>
    </>
  );
};

export default Home;
