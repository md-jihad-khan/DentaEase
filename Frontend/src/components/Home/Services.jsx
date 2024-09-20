import cosmetic from "../../assets/cosmetic.png";
import treatment from "../../assets/treatment.png";
import ortho from "../../assets/ortho.png";
import surgery from "../../assets/surgery.png";
import implant from "../../assets/implant.png";
import oral from "../../assets/oral.png";

const Services = () => {
  return (
    <section className="md:w-10/12 mx-auto">
      <h4 className="text-center text-5xl font-bold text-sky-500">
        Our <span className="text-black">Services</span>
      </h4>
      <p className="px-2 text-center text-gray-600 font-thin text-sm mt-6 mb-10">
        Prevention is the foundation of a healthy smile. Our preventive dental
        care services focus on stopping problems before they start. <br /> With
        regular check-ups, professional cleanings, and expert advice on oral
        hygiene, we help you keep your teeth and gums healthy, preventing
        cavities, gum disease, and other dental issues
      </p>

      <div className="grid mx-5 gap-5 grid-cols-6 mt-5">
        <div className="card card-compact border border-sky-200  hover:scale-105 transition bg-gradient-to-t from-sky-100  via-sky-50  to-transparent col-span-3">
          <figure className="mt-5">
            <img
              src={treatment}
              className="w-1/4  p-2 bg-sky-300 rounded-full"
              alt="Shoes"
            />
          </figure>

          <div className="card-body items-center text-center">
            <h2 className="card-title text-sky-500">Dental Treatment</h2>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae, nesciunt?
            </p>
          </div>
        </div>

        <div className="card card-compact border border-sky-200  hover:scale-105 transition bg-gradient-to-t from-sky-100  via-sky-50  to-transparent col-span-3">
          <figure className="mt-5">
            <img
              src={oral}
              className="w-1/4  p-2 bg-sky-300 rounded-full"
              alt="Shoes"
            />
          </figure>

          <div className="card-body items-center text-center">
            <h2 className="card-title text-sky-500">Oral Hygiene</h2>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae, nesciunt?
            </p>
          </div>
        </div>
        <div className="card card-compact border border-sky-200  hover:scale-105 transition bg-gradient-to-t from-sky-100  via-sky-50  to-transparent col-span-2">
          <figure className="mt-5 ">
            <img
              src={ortho}
              className="w-1/4  p-2 bg-sky-300 rounded-full "
              alt="Shoes"
            />
          </figure>

          <div className="card-body items-center text-center">
            <h2 className="card-title text-sky-500">Orthodontics</h2>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae, nesciunt?
            </p>
          </div>
        </div>
        <div className="card card-compact border border-sky-200  hover:scale-105 transition bg-gradient-to-t from-sky-100  via-sky-50  to-transparent col-span-2">
          <figure className="mt-5">
            <img
              src={surgery}
              className="w-1/4  p-2 bg-sky-300 rounded-full"
              alt="Shoes"
            />
          </figure>

          <div className="card-body items-center text-center">
            <h2 className="card-title text-sky-500">Dental Surgery</h2>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae, nesciunt?
            </p>
          </div>
        </div>
        <div className="card card-compact border border-sky-200  hover:scale-105 transition bg-gradient-to-t from-sky-100  via-sky-50  to-transparent col-span-2">
          <figure className="mt-5">
            <img
              src={implant}
              className="w-1/4  p-2 bg-sky-300 rounded-full"
              alt="Shoes"
            />
          </figure>

          <div className="card-body items-center text-center">
            <h2 className="card-title text-sky-500">Dental Implant</h2>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae, nesciunt?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
