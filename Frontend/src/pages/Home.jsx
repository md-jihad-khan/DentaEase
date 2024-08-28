import Banner from "../components/Home/Banner";
import Reviews from "../components/Home/Reviews";
import Services from "../components/Home/Services";

const Home = () => {
  return (
    <div className="bg-sky-50/90 ">
      <Banner />
      <Services />
      <Reviews />
    </div>
  );
};

export default Home;
