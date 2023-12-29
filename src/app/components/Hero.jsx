import React, { useState } from "react";

const Hero = () => {
  const ImageList = [
    {
      id: 1,
      img: "https://foodies-zone.netlify.app/assets/biryani2-0YgeW9Uq.png",
    },
    {
      id: 2,
      img: "https://foodies-zone.netlify.app/assets/biryani3-2P17nmNK.png",
    },
    {
      id: 3,
      img: "https://foodies-zone.netlify.app/assets/biryani5-Dqmynf2n.png",
    },
  ];
  const [imageId, setImageId] = useState(
    "https://foodies-zone.netlify.app/assets/biryani2-0YgeW9Uq.png",
  );

  const bgImage = {
    backgroundImage: `url(https://foodies-zone.netlify.app/assets/vector3-rNAzasPw.png)`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
  };

  return (
    <div className="overflow-x-hidden bg-white ">
      <div
        className="min-h-[550px] sm:min-h-[600px] flex justify-center items-center duration-200 bg-white"
        style={bgImage}
      >
        <div className="container pb-8 sm:pb-0 px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* text content section */}
            <div
              data-aos="zoom-out"
              data-aos-duration="400"
              data-aos-once="true"
              className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 text-gray-900"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                Welcome{" "}
                <span class="bg-clip-text text-transparent bg-gradient-to-b from-[#fbbf24] to-[#d97706]">
                  MBNRZ
                </span>{" "}
                Zone
              </h1>
              <p className="text-sm ">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
                reiciendis inventore iste ratione ex alias quis magni at optio
              </p>
              <div>
                <button
                  onClick={() => window.scrollBy(0, 680)}
                  className="bg-gradient-to-r from-[#fbbf24] to-[#ffc400] hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                >
                  Order Now
                </button>
              </div>
            </div>
            {/* Image section */}
            <div className="min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative order-1 sm:order-2 ">
              <div className="h-[300px] sm:h-[450px] overflow-hidden flex justify-center items-center">
                <img
                  data-aos="zoom-in"
                  data-aos-duration="300"
                  data-aos-once="true"
                  src={imageId}
                  alt="biryani img"
                  className="w-[300px] sm:w-[450px] sm:scale-125  mx-auto spin "
                />
              </div>
              <div className="flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:py-2 justify-center gap-4 absolute bottom-[0px] lg:-right-10 bg-white/30 rounded-full xl:mr-6">
                {ImageList.map((item) => (
                  <img
                    key={item.id}
                    data-aos="zoom-in"
                    data-aos-duration="400"
                    data-aos-once="true"
                    src={item.img}
                    onClick={() => {
                      setImageId(
                        item.id === 1
                          ? "https://foodies-zone.netlify.app/assets/biryani2-0YgeW9Uq.png"
                          : item.id === 2
                            ? "https://foodies-zone.netlify.app/assets/biryani3-2P17nmNK.png"
                            : "https://foodies-zone.netlify.app/assets/biryani5-Dqmynf2n.png",
                      );
                    }}
                    alt="biryani img"
                    className="cursor-pointer max-w-[80px] h-[80px] object-contain inline-block hover:scale-105 duration-200"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
