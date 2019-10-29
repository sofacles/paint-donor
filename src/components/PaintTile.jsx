import React from "react";
import { Link } from 'react-router-dom';

export const PaintTile = ({paintUnit}) => {
    const needHash = paintUnit.rgb && paintUnit.rgb[0] !== '#';
    const rgbStyle = {
        height: "50px",
        backgroundColor: `${needHash ? '#': ''}${paintUnit.rgb && paintUnit.rgb.length > 0 
            ? paintUnit.rgb : "#fff"}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };

    const imgStyle = {
        height: "90%",
        margin: "5px"
    };

    const linkStyle = {
        textDecoration: "none",
        color: "#000"
    };

    const image = (paintUnit.imageName && paintUnit.imageName.length > 3)
    ? <img alt="paint color" style={imgStyle} src={`uploads/${paintUnit.imageName}`} /> 
    : "";

    return <Link to={{
        pathname: "/SendMail",
        state: { paintUnit }
        }} style={linkStyle}>
        <div className="paint-cell">
            <span>{paintUnit.brand}</span>
            <span>{paintUnit.name}</span>
            <span>{paintUnit.quantity}</span>

            <div style={rgbStyle} >
                {image}
            </div>
        </div>
    </Link>

};