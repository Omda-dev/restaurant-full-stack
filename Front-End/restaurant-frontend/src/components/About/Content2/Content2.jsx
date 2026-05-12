import "./Content2.css";
import aboutcontent from '../../../assets/aboutcontent.jpg'

const Content2 = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-text">
          <h2>A little information for our valuable guest</h2>
          <p>
            At place, we believe that dining is not just about food, but also
            about the overall experience. Our staff, renowned for their warmth
            and dedication, strives to make every visit an unforgettable event.
          </p>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>3</h3>
              <p>Locations</p>
            </div>
            <div className="stat-card">
              <h3>1995</h3>
              <p>Founded</p>
            </div>
            <div className="stat-card">
              <h3>65+</h3>
              <p>Staff Members</p>
            </div>
            <div className="stat-card">
              <h3>100%</h3>
              <p>Satisfied Customers</p>
            </div>
          </div>
        </div>

        <div className="about-image">
          <img
            src={aboutcontent}
            alt="Cooking"
          />
        </div>
      </div>
    </section>
  );
};

export default Content2;
