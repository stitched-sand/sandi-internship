import React, { useState, useEffect } from "react";
import axios from "axios";
import NFTCard from "../NFTCard";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [visibleCount, setVisibleCount] = useState(8);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setVisibleCount(8);

    const url = filter
      ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
      : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

    axios
      .get(url)
      .then((response) => {
        setExploreItems(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [filter]);

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
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoading
        ? Array.from({ length: 8 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
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
        : exploreItems.slice(0, visibleCount).map((exploreItem) => (
            <div
              key={exploreItem.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NFTCard
                item={exploreItem}
                getTimeRemaining={getTimeRemaining}
              />
            </div>
          ))}
      {!isLoading && visibleCount < exploreItems.length && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() => {
              setVisibleCount((previousCount) => previousCount + 4);
            }}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
