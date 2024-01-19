import "./ResultPopUp.css";
import Button from "../Button/Button";

const ResultPopUp = ({ handleResultModalClose, percentage }) => {
  return (
    <div className="resultModalOverlay">
      <div className="resultModalContent">
        <h3>Checklist Result:</h3>
        <p>{isNaN(percentage) ? 0 : Math.floor(percentage)}%</p>
        <Button onBtnClick={handleResultModalClose} btnText="Close" />
      </div>
    </div>
  );
};

export default ResultPopUp;
