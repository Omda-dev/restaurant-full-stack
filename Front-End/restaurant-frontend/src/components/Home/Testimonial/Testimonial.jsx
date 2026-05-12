import './Testimonial.css'
import person1 from '../../../assets/person1.webp'
import person2 from '../../../assets/person2.jpg'
import person3 from '../../../assets/person3.webp'

const testimonials = [
  {
    quote: "The best restaurant",
    text: "Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.",
    name: "Sophire Robson",
    location: "Los Angeles, CA",
    img: person1
  },
  {
    quote: "Simply delicious",
    text: "Place exceeded my expectations on all fronts. The ambiance was cozy and relaxed, making it a perfect venue for our anniversary dinner. Each dish was prepared and beautifully presented.",
    name: "Matt Cannon",
    location: "San Diego, CA",
    img: person2
  },
  {
    quote: "One of a kind restaurant",
    text: "The culinary experience at place is first to none. The atmosphere is vibrant, the food – nothing short of extraordinary. The food was the highlight of our evening. Highly recommended.",
    name: "Andy Smith",
    location: "San Francisco, CA",
    img: person3
  }
]

const Testimonial = () => {
  return (
    <section className="testimonials-section">
      <h2>What Our Customers Say</h2>
      <div className="testimonials-container">
        {testimonials.map((t, i) => (
          <div className="testimonial-card" key={i}>
            <h3>“{t.quote}”</h3>
            <p>{t.text}</p>
            <div className="testimonial-author">
              <img src={t.img} alt={t.name} />
              <div>
                <strong>{t.name}</strong>
                <span>{t.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonial
