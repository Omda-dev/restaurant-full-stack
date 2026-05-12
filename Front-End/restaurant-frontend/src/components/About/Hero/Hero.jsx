import './Hero.css'
import abouthero from '../../../assets/abouthero.jpg'

const Hero = () => {
  return (
    <div className='section-container'>
      <div className='image-container'>
        <img src={abouthero} alt='Healthy meal' />
      </div>
      <div className='text-container'>
        <h1>We provide healthy food for your family❤️</h1>
        <p>
          Our story began with a vision to create a unique dining experience
          that merges fine dining, exceptional service, and a vibrant ambiance.
          Rooted in the city's rich culinary culture, we aim to honor our local
          roots while infusing a global palate. At [place], we believe that
          dining is not just about food, but also about the overall experience.
          Our staff, renowned for their warmth and dedication, strives to make
          every visit an unforgettable event.
        </p>
      </div>
    </div>
  )
}

export default Hero
