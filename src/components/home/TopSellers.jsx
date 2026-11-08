import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
      )
      .then((response) => {
        setSellers(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {isLoading
                ? Array.from({ length: 12 }).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp top-sellers-skeleton">
                        <div className="top-sellers-skeleton__image skeleton-box"></div>

                        <div className="top-sellers-skeleton__info">
                          <div className="top-sellers-skeleton__author skeleton-box"></div>
                          <div className="top-sellers-skeleton__price skeleton-box"></div>
                        </div>
                      </div>
                    </li>
                  ))
                : sellers.map((seller) => (
                    <li key={seller.id}>
                      <div className="author_list_pp">
                        <Link
                          to={`https://nft-marketplacee.web.app/author/${seller.authorId}`}
                        >
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link
                          to={`https://nft-marketplacee.web.app/author/${seller.authorId}`}
                        >
                          {seller.authorName}
                        </Link>
                        <span>{seller.price}</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
