import  React,  { useEffect, useState }  from 'react';
import { PaintTile } from "./PaintTile";
const Home = () => {
    let macGuffin = 0;
    const [paintChips, setPaintChips] = useState({
        paintChips: [
            {
                rgb: '',
                brand: '',
                name: '',
                quantity: '',
                email: '',
                _id: '1'
            }
        ]
    });
    let theTiles = paintChips.paintChips.map((chip) => {
       return <PaintTile key={chip._id} paintUnit={chip} />
    });
    useEffect(() => {
        fetch("/api/paints/1234")
        .then(x => x.text())
        .then(t => {
            setPaintChips({paintChips : JSON.parse(t)});
            });
        }, [macGuffin]);
    const homeStyle = {
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap"
    };

    return <div>
            <h1>Available Paint</h1>
            <div style={homeStyle}>
            {theTiles}
            </div>
        </div>
}

export default Home;