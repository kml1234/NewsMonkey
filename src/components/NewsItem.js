const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className=" badge rounded-pill bg-danger">{source.name}</span>
        </div>
        <img
          src={
            imageUrl
              ? imageUrl
              : "https://img.freepik.com/free-vector/error-404-concept-landing-page_52683-10996.jpg?w=1060&t=st=1664613078~exp=1664613678~hmac=6eb61bcfac2a03480142c675edcc96a2aaab5bdab9f6f1ed5d777ae91cd84b7c"
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-mute">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>{" "}
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
