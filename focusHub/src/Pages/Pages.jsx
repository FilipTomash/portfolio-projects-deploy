import { Routes, Route } from "react-router-dom";
import LandingPage from "./Landing-Page/Landing-Page";
import LoginPage from "./LoginPage/LoginPage";
import WorkSession from "./WorkSessionPage/WorkSession";
import StatisticsPage from "./StatisticsPage/StatisticsPage";
import RemindersPage from "./RemindersPage/RemindersPage";
import HowToBe from "./HowToBeProductive/HowTobe";
import Calendar from "./CalendarPage/Calendar";
import AboutUs from "./AboutUs/AboutUs";
import ContactUs from "./ContactUs/ContactUs";
import UserInfoPage from "./UserPage/UserPage";
import BlogArticle from "./Blog/Blog";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
export const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/work-session" element={<WorkSession />} />
      <Route path="/statistics" element={<StatisticsPage />} />
      <Route path="/reminders" element={<RemindersPage />} />
      <Route path="/productive-tips" element={<HowToBe />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/user-info" element={<UserInfoPage />} />
      <Route path="/blog/learn-more-sales" element={<BlogArticle />} />
      <Route path="/blog/learn-more-efficiency" element={<BlogArticle />} />
      <Route path="/blog/learn-more-compensation" element={<BlogArticle />} />
      <Route path="/blog/learn-more-loyalty" element={<BlogArticle />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
