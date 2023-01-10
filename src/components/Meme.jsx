import React from "react"

function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    const [allMeme, setAllMemeImages] = React.useState([])
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then((res) => res.json())
            .then((data) => setAllMemeImages(data.data.memes))
    }, [])


    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMeme.length)
        setMeme(
            {
                topText:"",
                bottomText:"", 
                randomImage:allMeme[randomNumber].url}
            )
    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme((prevMeme => ({
            ...prevMeme, 
            [name]:value})))
    }
    
    return (
        <main>
            <div className="form">
                <input
                    className="form-input" 
                    type="text"
                    placeholder="Top Text"
                    name="topText" 
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    className="form-input" 
                    type="text"
                    placeholder="Bottom Text"
                    name="bottomText" 
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button className="form-button" onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img className="meme-img" src={meme.randomImage} alt="" />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
            
        </main>
    )
}

export default Meme