import "./Content.css";
import chef from '../../../assets/chef.avif';
import shrimp from '../../../assets/shrimp.webp';
import meat from '../../../assets/meat.jpg';

const images = [
  { src: chef , alt: "Chef cooking herbs in pan", className: "image1" },
  { src: shrimp, alt: "Shrimp dish with vegetables", className: "image2" },
  { src: meat, alt: "Grilled meat and potatoes", className: "image3" }
];

const Content = () => {
  return (
    <section className="foodSection">
      <div className="imagesColumn">
        <div className="largeImageWrapper">
          <img src={images[0].src} alt={images[0].alt} className={`image ${images[0].className}`} />
        </div>
        <div className="smallImagesWrapper">
          <img src={images[1].src} alt={images[1].alt} className={`smallImage ${images[1].className}`} />
          <img src={images[2].src} alt={images[2].alt} className={`smallImage ${images[2].className}`} />
        </div>
      </div>

      <div className="textColumn">
        <h2 className="title">Fastest Food Delivery in City</h2>
        <p className="description">
          Our visual designer lets you quickly and drag a down your way to custom apps for both desktop.
        </p>
        <ul className="features">
          <li>Delivery within 30 minutes</li>
          <li>Best Offer & Prices</li>
          <li>Online Services Available</li>
        </ul>
      </div>
    </section>
  );
};

export default Content;
