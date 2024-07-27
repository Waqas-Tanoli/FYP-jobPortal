"use client";

import GlobalApi from "@/_utils/GlobalApi";
import Image from "next/image";
import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";

const ReviewCards = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReview();
  }, []);

  const getReview = () => {
    GlobalApi.getReviewCards().then((res) => {
      console.log(res.data.data);
      setReviews(res.data.data);
    });
  };

  return (
    <div className="ml-4">
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((item, index) => {
            // getting review text
            const reviewText = item.attributes?.Review?.map(
              (r) => r.children[0]?.text
            ).join(" ");

            return (
              <SwiperSlide key={index}>
                <div className=" p-3 bg-white flex flex-col justify-between h-full">
                  <div className="flex-1">
                    <p className="text-sm mb-2">{reviewText}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <Image
                      src={item.attributes?.Picture?.data?.attributes?.url}
                      alt="User Image"
                      width={40}
                      height={40}
                      className="rounded-full border border-gray-300"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-bold">
                        {item.attributes?.Name}
                      </p>
                      <p className="text-xs italic text-gray-600">
                        {item.attributes?.Country}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <p>No Data Found</p>
        )}
      </Swiper>
    </div>
  );
};

export default ReviewCards;
