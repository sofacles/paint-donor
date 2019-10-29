import React from "react";
export const PaintTile = ({paintUnit}) => {
    const needHash = paintUnit.rgb && paintUnit.rgb[0] !== '#';
    const rgbStyle = {
        height: "50px",
        backgroundColor: `${needHash ? '#': ''}${paintUnit.rgb && paintUnit.rgb.length > 0 ? paintUnit.rgb : "#fff"}`
    };
    const image = (paintUnit.imageName && paintUnit.imageName.length > 3) ? 
    <div>
        <img alt="paint color" style={rgbStyle} src={`uploads/${paintUnit.imageName}`} />
    </div> : <div style={rgbStyle} ></div>;

    return <div className="paint-cell">
    <span>{paintUnit.brand}</span>
    <span>{paintUnit.name}</span>
    <span>{paintUnit.quantity}</span>
    {image}

    </div>
};