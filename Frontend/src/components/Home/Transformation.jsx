import { Link } from "react-router-dom";
import teeth1 from "../../assets/transform1.jpg";
import teeth3 from "../../assets/transform3.jpg";
import teeth4 from "../../assets/transform4.jpg";
import { FaArrowRight } from "react-icons/fa6";

const Transformation = () => {
  return (
    <section className="my-10 px-4 md:px-0 mt-20 md:w-11/12 mx-auto">
      {/* content */}
      <div className="mb-10 flex flex-col md:flex-row items-start md:items-end justify-between ">
        <div>
          <h4 className="text-3xl lg:text-4xl xl:text-5xl mb-2 md:mb-4 font-bold text-sky-500 mt-5 md:mt-0">
            See the <span className="text-black">Transformation</span>
          </h4>
          <h3 className="text-2xl lg:text-3xl xl:text-4xl font-medium mb-3 text-gray-700">
            Stunning results that showcase the life changing impact
          </h3>
        </div>

        <Link className="btn btn-lg rounded-full bg-sky-500 text-white flex gap-3 ">
          Contact Us <FaArrowRight />
        </Link>
      </div>

      {/* img */}
      <div className="flex gap-5 rounded-lg ">
        <div className="diff aspect-[16/9] ">
          <div className="diff-item-1">
            <img
              alt="daisy"
              className="rounded-3xl"
              src="https://www.adelaidedental.net/wp-content/uploads/2016/11/AdelaideDental_Symptoms-DiscolouredTeeth_ver1.jpg.jpg"
            />
          </div>
          <div className="diff-item-2">
            <img alt="daisy" className="rounded-3xl" src={teeth1} />
          </div>
          <div className="diff-resizer"></div>
        </div>
        <div className="diff aspect-[16/9]">
          <div className="diff-item-1">
            <img className="rounded-3xl" src={teeth3} />
          </div>
          <div className="diff-item-2">
            <img className="rounded-3xl" src={teeth4} />
          </div>
          <div className="diff-resizer"></div>
        </div>
      </div>
    </section>
  );
};

export default Transformation;
