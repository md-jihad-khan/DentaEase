import { Link } from "react-router-dom";
import doctor from "../../assets/doctor.png";

const Banner = () => {
  return (
    <section className="bg-gradient-to-b from-sky-200  via-sky-100  to-transparent  md:-mt-16 ">
      <div className="flex items-center justify-center flex-col-reverse md:flex-row w-10/12 mx-auto">
        <div className="md:w-1/2 mb-20 md:mt-20  md:p-10 p-4  space-y-5">
          <h3 className="font-bold text-3xl md:text-5xl lg:text-6xl">
            <span className="text-sky-500">Consult </span>
            Your Dental Health Issue
          </h3>

          <p className="md:text-sm  text-xs text-gray-500">
            Achieve a healthy, beautiful smile with our comprehensive dental
            care services. From routine cleanings and exams to advanced
            restorative treatments, we are committed to maintaining your oral
            health. Our experienced team provides personalized care in a
            comfortable, state-of-the-art environment, ensuring your teeth and
            gums remain in top condition.
          </p>

          <Link
            to={"/appointment"}
            className="btn rounded-3xl bg-sky-500 text-white "
          >
            Book a Appointment
          </Link>
        </div>
        <div className="md:w-1/2 relative">
          <img className="p-5" src={doctor} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
