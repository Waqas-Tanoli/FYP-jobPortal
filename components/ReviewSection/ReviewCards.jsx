"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { getReviewCards } from "@/app/api/reviewCards";

const ReviewCards = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviewCards();
        setReviews(data?.data || []);
      } catch (error) {
        setError("Failed to load reviews. Please try again later.");
      }
    };

    fetchReviews();
  }, []);

  const reviewTextExtractor = (review) =>
    review?.attributes?.Review?.map((r) => r.children[0]?.text).join(" ") || "";

  return (
    <div className="ml-4">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 5 },
          }}
        >
          {Array.isArray(reviews) && reviews.length > 0 ? (
            reviews.map((item, index) => {
              const reviewText = reviewTextExtractor(item);
              const imageUrl =
                item?.attributes?.Picture?.data?.attributes?.url ||
                "/default-image.jpg";

              return (
                <SwiperSlide key={index}>
                  <div className="p-3 bg-white flex flex-col justify-between h-full">
                    <div className="flex-1">
                      <p className="text-sm mb-2">{reviewText}</p>
                    </div>
                    <div className="flex items-center mt-2">
                      <Image
                        src={imageUrl}
                        alt="User Image"
                        width={40}
                        height={40}
                        className="rounded-full border border-gray-300"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-bold">
                          {item.attributes?.Name || "Anonymous"}
                        </p>
                        <p className="text-xs italic text-gray-600">
                          {item.attributes?.Country || "Unknown"}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            <p>No reviews found.</p>
          )}
        </Swiper>
      )}
    </div>
  );
};

export default ReviewCards;
