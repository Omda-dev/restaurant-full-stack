import HeroSection from './HeroSection/HeroSection'
import BrowseMenu from './BrowseMenu/BrowseMenu'
import Testimonial from './Testimonial/Testimonial'
import Content from './Content/Content'
import Offers from '../Menu/Offers/Offers'

const Home = () => {
  return (
    <div>
        <HeroSection />
        <BrowseMenu />
        <Content />
        <Offers />
        <Testimonial />
    </div>

  )
}

export default Home