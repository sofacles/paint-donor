const OppositeColor = (rgb) => {

    try {
        let r = parseInt(rgb[0], 16);
        let g = parseInt(rgb[1], 16);
        let b = parseInt(rgb[2], 16);
        //complement is 8 values more, and you might have to wrap around to zero again
        let rComp = (r + 8) % 16;
        let gComp = (g + 8) % 16;
        let bComp = (b + 8) % 16;
    
        return `${rComp.toString(16)}${gComp.toString(16)}${bComp.toString(16)}`;
    }

    catch (err) {
        console.log("Exception caught in Opposite Color");
        console.info(err);
        throw err;
    }
    
}

export default OppositeColor;