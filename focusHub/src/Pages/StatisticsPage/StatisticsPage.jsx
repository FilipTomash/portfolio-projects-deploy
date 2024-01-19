import Aside from "../../Layouts/Aside/Aside";
import BarChart from "../../Components/BarChart/BarChart";
import "./StatisticsPage.css";

const StatisticsPage = () => {
  return (
    <div className="StatisticsMain">
      <Aside />
      <div className="Charts">
        <BarChart />
      </div>
    </div>
  );
};
export default StatisticsPage;
