import "./App.css";
import { useState } from "react";
import React from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

let apiKey = process.env.REACT_APP_NEWS_API;
console.log(process.env.REACT_APP_NEWS_API);
const App = () => {
  const paths = [
    "",
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
    "keywordSearch:id",
  ];
  let [progress, setProgress] = useState(0);

  // const setPProgress = (progress) => {

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar height={3} color="#f11946" progress={progress} />

        <Routes>
          {paths.map((path, ind) => {
            return (
              <Route
                exact
                key={ind}
                path={`/${path}`}
                element={
                  <News
                    apiKey={apiKey}
                    setProgress={setProgress}
                    key={ind}
                    pageSize={12}
                    country="in"
                    category={path}
                    keyword={""}
                  />
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
