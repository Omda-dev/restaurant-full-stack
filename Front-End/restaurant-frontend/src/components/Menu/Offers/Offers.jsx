import './Offers.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import slider2 from '../../../assets/slider2.jpg'
import food2 from '../../../assets/food2.jpg'
import sushi from '../../../assets/sushi.jpg'

const offersData = [
  { id: 1, title: "50% Off Pizza", description: "Enjoy half price on all pizzas this week only.", img: slider2 },
  { id: 2, title: "Buy 1 Get 1 Free Burger", description: "Order one burger and get another one for free.", img: food2 },
  { id: 3, title: "30% Off Sushi", description: "Exclusive discounts on all sushi rolls.", img: sushi },
];

const Offers = () => {
  const navigate = useNavigate();

  const handleSlideClick = (offer) => navigate(`/offers/${offer.id}`);
  const handleClaimClick = (e, offer) => {
    e.stopPropagation();
    navigate(`/offers/${offer.id}/claim`);
  };

  return (
    <div className="offers-section my-16">
      <h2 className="text-3xl font-extrabold text-center mb-10">Exclusive Offers</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="offers-swiper"
      >
        {offersData.map((offer) => (
          <SwiperSlide key={offer.id}>
            <div className="offer-slide cursor-pointer" onClick={() => handleSlideClick(offer)}>
              <img src={offer.img} alt={offer.title} className="offer-img" />
              <div className="offer-overlay">
                <div className="offer-text">
                  <h3 className="title">{offer.title}</h3>
                  <p className="description">{offer.description}</p>
                  <button className="btn" onClick={(e) => handleClaimClick(e, offer)}>Claim Offer Now</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Offers;
