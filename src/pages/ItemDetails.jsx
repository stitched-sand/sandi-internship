import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`,
      )
      .then((response) => {
        setItem(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [nftId]);

  return (
    <>
      {isLoading ? (
        <div id="wrapper">
          <div className="no-bottom no-top" id="content">
            <div id="top"></div>
            <section aria-label="section" className="mt90 sm-mt-0">
              <div className="container">
                <div className="row">
                  {/* NFT image skeleton */}
                  <div className="col-md-6 text-center">
                    <div className="item-details-skeleton__image skeleton-box"></div>
                  </div>

                  {/* NFT information skeleton */}
                  <div className="col-md-6">
                    <div className="item_info">
                      <div className="item-details-skeleton__title skeleton-box"></div>

                      {/* Views and likes */}
                      <div className="item_info_counts">
                        <div className="item-details-skeleton__count skeleton-box"></div>
                        <div className="item-details-skeleton__count skeleton-box"></div>
                      </div>

                      {/* Description */}
                      <div className="item-details-skeleton__description skeleton-box"></div>

                      {/* Owner */}
                      <div className="item-details-skeleton__person">
                        <h6>Owner</h6>
                        <div className="item-details-skeleton__person-info">
                          <div className="item-details-skeleton__avatar skeleton-box"></div>
                          <div className="item-details-skeleton__name skeleton-box"></div>
                        </div>
                      </div>

                      {/* Creator */}
                      <div className="item-details-skeleton__person">
                        <h6>Creator</h6>
                        <div className="item-details-skeleton__person-info">
                          <div className="item-details-skeleton__avatar skeleton-box"></div>
                          <div className="item-details-skeleton__name skeleton-box"></div>
                        </div>
                      </div>

                      {/* Price */}

                      <h6 className="item-details-skeleton__price-title">
                        Price
                      </h6>
                      <div className="item-details-skeleton__price skeleton-box"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div id="wrapper">
          <div className="no-bottom no-top" id="content">
            <div id="top"></div>
            <section aria-label="section" className="mt90 sm-mt-0">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <img
                      src={item.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {item.title}
                        {item.tag}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {item.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {item.likes}
                        </div>
                      </div>
                      <p>{item.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={item.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.ownerId}`}>
                                {item.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={item.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.creatorId}`}>
                                {item.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetails;
