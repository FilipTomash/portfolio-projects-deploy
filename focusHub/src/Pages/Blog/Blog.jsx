import "./Blog.css";
import { useState } from "react";
import { FaCheckCircle, FaStar, FaHeart } from "react-icons/fa";
import { AiOutlineInfoCircle, AiOutlineDownload } from "react-icons/ai";
import { RiQuestionnaireFill, RiArrowDownSFill } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import BlogSalesArticle from "./BlogSalesArticle";
import BlogEfficencyArticle from "./BlogEfficencyArticle";
import BlogCompensationArticle from "./BlogCompensationArticle";
import BlogLoyaltyArticle from "./BlogLoyaltyArticle";

const BlogArticle = () => {
  const location = useLocation();
  const isLearnMoreSales = location.pathname === "/blog/learn-more-sales";
  const isLearnMoreEff = location.pathname === "/blog/learn-more-efficiency";
  const isLearnMoreComp = location.pathname === "/blog/learn-more-compensation";
  const isLearnMoreLoyalty = location.pathname === "/blog/learn-more-loyalty";

  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (splide) => {
    setActiveSlide(splide.index);
  };

  const renderSlides = () => {
    if (isLearnMoreEff) {
      return (
        <>
          <SplideSlide>
            <BlogEfficencyArticle />
          </SplideSlide>
          <SplideSlide>
            <BlogSalesArticle />
          </SplideSlide>
          <SplideSlide>
            <BlogCompensationArticle />
          </SplideSlide>
          <SplideSlide>
            <BlogLoyaltyArticle />
          </SplideSlide>
        </>
      );
    } else if (isLearnMoreSales) {
      return (
        <>
          <SplideSlide>
            <BlogSalesArticle />
          </SplideSlide>
          <SplideSlide>
            <BlogEfficencyArticle />
          </SplideSlide>
          <SplideSlide>
            <BlogCompensationArticle />
          </SplideSlide>
          <SplideSlide>
            <BlogLoyaltyArticle />
          </SplideSlide>
        </>
      );
    } else if (isLearnMoreComp) {
      return (
        <>
          <SplideSlide>
            <BlogCompensationArticle />
          </SplideSlide>
          <SplideSlide>
            <BlogSalesArticle />
          </SplideSlide>
          <SplideSlide>
            <BlogEfficencyArticle />
          </SplideSlide>
          <SplideSlide>
            <BlogLoyaltyArticle />
          </SplideSlide>
        </>
      );
    } else if (isLearnMoreLoyalty) {
      return (
        <>
          <SplideSlide>
            <BlogLoyaltyArticle />
          </SplideSlide>
          <SplideSlide>
            <BlogCompensationArticle />
          </SplideSlide>
          <SplideSlide>
            <BlogSalesArticle />
          </SplideSlide>
          <SplideSlide>
            <BlogEfficencyArticle />
          </SplideSlide>
        </>
      );
    }
  };

  return (
    <div className="blog-article-content__content">
      <p className="check-out-text" style={{ fontSize: "22px" }}>
        Don't believe us? Check out for yourself!
      </p>

      <div className="icon-container">
        <FaCheckCircle className="icon" />
        <FaStar className="icon" />
        <FaHeart className="icon" />
        <AiOutlineInfoCircle className="icon" />
        <AiOutlineDownload className="icon" />
        <RiQuestionnaireFill className="icon" />
        <RiArrowDownSFill className="icon" />
      </div>

      <div className="splide-wrapper">
        <Splide
          options={{
            perPage: 1,
            rewind: false,
          }}
          onMoved={handleSlideChange}
        >
          {renderSlides()}
        </Splide>
        <NavLink to="/">Back</NavLink>
      </div>
    </div>
  );
};

export default BlogArticle;
