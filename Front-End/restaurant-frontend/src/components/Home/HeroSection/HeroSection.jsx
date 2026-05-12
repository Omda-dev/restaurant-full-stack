import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import './HeroSection.css'

import slider1 from '../../../assets/slider1.jpeg'
import slider2 from '../../../assets/slider2.jpg'
import slider3 from '../../../assets/slider3.jpg'

import BookATable from '../../BookATable/BookATable'

const slides = [
  { img: slider2, title: 'Freshly Baked Pizza', desc: 'Crispy crust, rich sauce, and the freshest ingredients – baked to perfection for an unforgettable taste.', cta: 'Book a Table' },
  { img: slider1, title: 'Pasta Alfredo', desc: 'Creamy, flavorful pasta tossed with fresh herbs and rich sauce—a comforting dish that delights every taste bud!', cta: 'Book a Table' },
  { img: slider3, title: 'Roast Beef', desc: 'Juicy, flavorful roast beef paired with fresh, crisp veggies— a mouthwatering feast that satisfies every bite!', cta: 'Book a Table' }
]

const HeroSection = () => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="hero-swiper">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        loop
        effect="fade"
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true, el: '.swiper-pagination' }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onSwiper={swiper => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
          swiper.navigation.init()
          swiper.navigation.update()
        }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <img src={slide.img} alt={slide.title} className="hero-slide-img"/>
            <div className="hero-overlay" />
            <div className="hero-content">
              <h2>{slide.title}</h2>
              <p>{slide.desc}</p>
              <button onClick={() => setIsModalOpen(true)}>{slide.cta}</button>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination"></div>
      </Swiper>

      <button ref={prevRef} className="hero-nav hero-prev">‹</button>
      <button ref={nextRef} className="hero-nav hero-next">›</button>

      <BookATable show={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default HeroSection
