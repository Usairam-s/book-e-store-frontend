import React from "react";
import bannerImg from "../../assets/banner.png";
const Banner = () => {
  return (
    <div className="py-16 flex md:items-center md:flex-row-reverse flex-col gap-16">
      <div className="md:w-1/2 w-full">
        <img src={bannerImg} alt="banner_img" />
      </div>
      <div className="md:w-1/2 w-full">
        <h2 className="md:text-5xl text-3xl mb-7">New Realeses this week</h2>
        <p className="text-gray-500 mb-7">
          It's time to update your reading list with some new an greatest
          releases Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut
          repudiandae labore ut doloremque ducimus nemo molestiae facilis, esse
          ipsum inventore impedit doloribus soluta non quibusdam rerum accusamus
          illum, autem unde?
        </p>
        <button className="bg-primary px-8 py-2 rounded-md shadow-md">
          See more
        </button>
      </div>
    </div>
  );
};

export default Banner;
