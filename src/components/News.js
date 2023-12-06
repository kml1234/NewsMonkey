import React, { useEffect, useState } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalResult, setTotalResult] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    console.log();
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&q=${props.keyword}&category=${props.category}&apiKey=e6234350a8d14ed395dfaff029d5fa18&page=${page}&pagesize=${props.pageSize}`;
    setloading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResult(parsedData.totalResults);
    setloading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${
      !props.category ? "HOME" : capitalizeFirstLetter(props.category)
    } - NewsMonkey`;
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    setPage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&q=${props.keyword}&category=${props.category}&apiKey=e6234350a8d14ed395dfaff029d5fa18&page=${page}&pagesize=${props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResult(parsedData.totalResults);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "5rem" }}
      >
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <hr />
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResult}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, ind) => {
              return (
                <div className="col-md-4" key={ind}>
                  <NewsItem
                    title={element.title ? element.title : "NaN"}
                    description={
                      element.description ? element.description : "NaN"
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
