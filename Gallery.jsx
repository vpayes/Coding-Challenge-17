// Task 2
import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('https://course-api.com/react-tours-project');
        if (!response.ok) {
          throw new Error('Failed to fetch tour data');
        }
        const data = await response.json();
        setTours(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

  const removeTour = (id) => {
    setTours(tours.filter(tour => tour.id !== id));
  };

  const toggleDescription = (id) => {
    setTours(tours.map(tour => 
      tour.id === id ? { ...tour, showDescription: !tour.showDescription } : tour
    ));
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="tour-list">
      {tours.map(tour => (
        <div className="tour-card" key={tour.id}>
          <img src={tour.image} alt={tour.name} />
          <h3>{tour.name}</h3>
          <p>Price: ${tour.price}</p>
          <button onClick={() => removeTour(tour.id)}>Not Interested</button>
          <div>
            {tour.showDescription ? (
              <p>{tour.description}</p>
            ) : (
              <button onClick={() => toggleDescription(tour.id)}>Read More</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;