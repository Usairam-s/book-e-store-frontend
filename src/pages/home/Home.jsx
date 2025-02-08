import React from "react";
import Banner from "./Banner";
import TopSeller from "./TopSeller";
import Recommend from "./Recommend";
import News from "./News";
import { useGetAllBooksQuery } from "../../store/features/bookApi/bookApi";

const Home = () => {
  // const { data, error, isLoading } = useGetAllBooksQuery();

  // working fine

  return (
    <>
      <Banner />
      <TopSeller />
      <Recommend />
      <News />
    </>
  );
};

export default Home;
