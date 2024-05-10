import React, { useEffect, useState } from 'react';

const YourComponent = (props) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchInput = props.forinput; // Replace with your actual search term
        const response = await fetch(
          `https://api.unsplash.com/search/photos?page=2&query=${searchInput}&client_id=xp-ehbmHSjRw338-Tr4bisv8lXQO0shEQ3STMWFIHqk`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const imagesData = data.results.slice(0, 2).map(result => result.urls.raw);

        setImages(imagesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {images.map((imageUrl, index) => (
        <div className='img-div'>
        <img key={index} src={imageUrl} alt={`Image ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default YourComponent;