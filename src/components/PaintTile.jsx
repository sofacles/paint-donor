import React from "react";
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
    const image = (paintUnit.imageName && paintUnit.imageName.length > 3)
    ? <img alt="paint color" style={imgStyle} src={`uploads/${paintUnit.imageName}`} /> 
    : "";

    return <div className="paint-cell">
    <span>{paintUnit.brand}</span>
    <span>{paintUnit.name}</span>
    <span>{paintUnit.quantity}</span>
    <div style={rgbStyle} >
    {image}
    </div>
   

    </div>
};