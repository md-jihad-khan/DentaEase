import AboutUs from "../components/Home/AboutUs";
import Banner from "../components/Home/Banner";
import Faq from "../components/Home/Faq";
import Reviews from "../components/Home/Reviews";
import Services from "../components/Home/Services";
import Transformation from "../components/Home/Transformation";

const Home = () => {
  return (
    <div className="bg-sky-50/90 ">
      <Banner />
      <Services />
      <Reviews />
      <AboutUs />
      <Faq />
      <Transformation />
    </div>
  );
};

export default Home;
