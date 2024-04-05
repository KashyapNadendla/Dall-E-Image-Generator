import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [images, setImages] = useState();
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isButton, setIsButton] = useState(true)

  useEffect(()=>{
    setIsButton(value === '')
  },[value])

  const getChatGptImage = async () => {
    try {
      setIsLoading(true);

      const options = {
        method: 'POST',
        body: JSON.stringify({
          message: value,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      };

      const response = await fetch('http://localhost:3003/images', options)
        .then((response) => response.json())
        .then((data) => {
          setImages(data.imageUrl);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          setIsLoading(false);
        });
    } catch (error) {
      console.error('error');
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="App">
        <h1 className="heading">DALL-E IMAGE GENERATOR</h1>
        <section className="search-section">
          <p>
            Write a detailed description for the image
            {/* <span className="surprise">  </span> */}
          </p>
          <div className="input-container">
            <input
              className="input-field"
              placeholder="Enter image prompt"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={isLoading}
            />
            <button className="generate-btn" onClick={getChatGptImage} disabled={isButton}>
              Generate
            </button>
          </div>
        </section>
        <section className="image-section">
          {isLoading ? (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          ) : images ? (
            <img src={images} />
          ) : null}
        </section>
      </div>
    </>
  );
};

export default App;