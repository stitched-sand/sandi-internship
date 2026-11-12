import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NFTCard from "../NFTCard";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(Date.now());

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
      )
      .then((response) => {
        setItems(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const getTimeRemaining = (expiryDate) => {
    const timeRemaining = expiryDate - currentTime;

    if (timeRemaining <= 0) {
      return "Expired";
    }

    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <Slider {...settings} className="new-items-slider">
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div key={`skeleton-${index}`}>
                      <div className="nft__item new-items-skeleton">
                        <div className="new-items-skeleton__image skeleton-box"></div>

                        <div className="new-items-skeleton__info">
                          <div className="new-items-skeleton__title skeleton-box"></div>

                          <div className="new-items-skeleton__bottom">
                            <div className="new-items-skeleton__price skeleton-box"></div>
                            <div className="new-items-skeleton__likes skeleton-box"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : items.map((item) => (
                    <div key={item.id}>
                      <NFTCard
                      item={item}
                      currentTime={currentTime}
                      getTimeRemaining={getTimeRemaining}
                      />
                    </div>
                  ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
