import AboutUs from "../components/Home/AboutUs";
import Banner from "../components/Home/Banner";
import Faq from "../components/Home/Faq";
import Footer from "../components/Home/Footer";
import Reviews from "../components/Home/Reviews";
import Services from "../components/Home/Services";
import Transformation from "../components/Home/Transformation";

const Home = () => {
  return (
    <div className="bg-sky-50/90 ">
      <Banner />
      <AboutUs />
      <Faq />
      <Transformation />
      <Services />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Home;
