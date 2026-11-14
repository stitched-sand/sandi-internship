import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const AuthorItems = ({ authorImage }) => {
  const [authorItems, setAuthorItems] = useState([]);
  const { authorId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
      )
      .then((response) => {
        
          setAuthorItems(response.data.nftCollection);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [authorId]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
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
            : authorItems.map((item) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={item.id}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="">
                        <img className="lazy" src={authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
