import React, { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import reactImage from './react.png';
import image1 from '../assets/1.jpeg';
import image2 from '../assets/2.jpeg';
import image3 from '../assets/3.jpeg';
import image4 from '../assets/7.jpeg';

// the images below should be displayed in div called recent places visited
import destinationImage1 from '../assets/11.jpg';
import destinationImage2 from '../assets/12.jpg';
import destinationImage3 from '../assets/13.jpg';
import destinationImage4 from '../assets/14.jpg';
import destinationImage5 from '../assets/15.jpg';
import destinationImage6 from '../assets/16.jpg';
import destinationImage7 from '../assets/17.jpg';
import destinationImage8 from '../assets/18.jpg';

function Home() {
  const vehicleImages = [
    { name: 'Garvey', imageSrc: image4 },
    { name: 'Che Guevara', imageSrc: image1 },
    { name: 'Portmore', imageSrc: image2 },
    { name: 'Lobster', imageSrc: image3 },
  ];

  const recentPlacesImages = [
    { imageSrc: destinationImage1, description: 'Description 1' },
    { imageSrc: destinationImage2, description: 'Description 2' },
    { imageSrc: destinationImage3, description: 'Description 3' },
    { imageSrc: destinationImage4, description: 'Description 4' },
    { imageSrc: destinationImage5, description: 'Description 5' },
    { imageSrc: destinationImage6, description: 'Description 6' },
    { imageSrc: destinationImage7, description: 'Description 7' },
    { imageSrc: destinationImage8, description: 'Description 8' },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % recentPlacesImages.length;
    setCurrentImageIndex(nextIndex);
  };

  const handlePreviousImage = () => {
    const previousIndex = (currentImageIndex - 1 + recentPlacesImages.length) % recentPlacesImages.length;
    setCurrentImageIndex(previousIndex);
  };

  return (
    <div className="home-container">
      <div className="title">
        <h1 className="main-title">TEAMTEMBEAKENYA</h1>
        <div className="react-logo-container">
          <img src={reactImage} alt="React" className="react-image" />
        </div>
        <h3 className="subtitle">
          Enjoy Yearly Challenges and get to know your country.
          Join the 'Explore Kenya Challenge' and embark on an affordable year-long journey of Discovery & Adventure In Style
        </h3>
      </div>
      <hr />
      <div className="trips">
        <h2>Upcoming Road Trips</h2>
        <table className="road-trip-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Tickets Available</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Beachside Retreat</td>
              <td>July 10, 2023</td>
              <td>5</td>
              <td>$50</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Mountain Adventure</td>
              <td>August 5, 2023</td>
              <td>8</td>
              <td>$75</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Coastal Getaway</td>
              <td>September 2, 2023</td>
              <td>3</td>
              <td>$60</td>
            </tr>
          </tbody>
        </table>
        <div className="booking-form">
          <p>Please sign in to book a trip.</p>
          <Link to="/login" className="signin-link">BOOK A SLOT</Link>
        </div>
      </div>
      <div className="recent-places-visited">
        <h2>HIGHLIGHTS ON RECENT ROADTRIPS</h2>
        
        <div className="image-gallery">
          <img
            src={recentPlacesImages[currentImageIndex].imageSrc}
            alt={`Destination ${currentImageIndex + 1}`}
            className="gallery-image"
          /><br/>
          <p className="image-description">{recentPlacesImages[currentImageIndex].description}</p>
          <div className="image-navigation">
            <button onClick={handlePreviousImage} className="previous-button">Previous</button>
            <button onClick={handleNextImage} className="next-button">Next</button>
          </div>
        </div>
      </div>
      <div className="vehicles">
        <h2>Vehicle Gallery</h2>
        <div className="gallery-container">
          {vehicleImages.map((vehicle, index) => (
            <div key={index} className="gallery-item">
              <img src={vehicle.imageSrc} alt={vehicle.name} className="gallery-image" />
              <p className="image-name"><strong>{vehicle.name}</strong></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
