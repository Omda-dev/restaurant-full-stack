import "./Map.css";

const Map = () => {
  return (
    <div className="map-container">
        <h1>Visit Us</h1>
      <iframe
        title="restaurant-location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.27991927465!2d-74.25987568727394!3d40.697670063552785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c250b5d4a42b21%3A0x1f6b0d6e0d5a0!2sNew%20York!5e0!3m2!1sen!2sus!4v1692222222222!5m2!1sen!2sus"
        width="100%"
        height="600"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Map;
