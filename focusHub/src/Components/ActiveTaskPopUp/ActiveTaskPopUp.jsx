import { useState, useRef, useEffect } from "react";
import Button from "../Button/Button";
import "./ActiveTaskPopUp.css";
import { Colors } from "chart.js";

const ActiveTaskPopUp = (props) => {
  const {
    selectedTask,
    setSelectedTask,
    sections,
    comments,
    handleCommentChange,
    textareaRef,
    result,
    setResult,
    setShowResultModal,
    devident,
    setDevident,
    handleSubmit,
  } = props;

  const [currentSubtaskIndex, setCurrentSubtaskIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isPopupOpen && inputRefs.current.length > 0) {
      inputRefs.current[0].focus();
    }
  }, [isPopupOpen]);

  useEffect(() => {
    if (currentSubtaskIndex < inputRefs.current.length) {
      inputRefs.current[currentSubtaskIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentSubtaskIndex]);

  const handleAnswerButton = (index, answer) => {
    const updatedResult = parseInt(result) + (answer === "yes" ? 1 : 0);
    const updatedTasksLength = devident + 1;
    setDevident(updatedTasksLength);
    setResult(updatedResult);

    const nextIndex = index + 1;
    setCurrentSubtaskIndex(nextIndex);
    if (nextIndex < selectedTask.subtasks.length) {
      inputRefs.current[nextIndex].disabled = true;
      inputRefs.current[nextIndex].focus();
    }
  };

  console.log(JSON.parse(localStorage.getItem("completedTasks")));
  console.log("initial task", selectedTask.subtasks);
  console.log("initial sections", sections);

  const handleSubmitStates = () => {
    setSelectedTask(null);
    setShowResultModal(true);
    setIsPopupOpen(false);
  };
  const handleClosePopUp = () => {
    setSelectedTask(null);
    setIsPopupOpen(false);
  };

  const fullHandleSubmitLogic = () => {
    handleSubmit(), handleSubmitStates();
  };

  return (
    <>
      {isPopupOpen && (
        <div className="popupOverlay">
          <div className="popupContent">
            <span className="closeBtn">
              <Button className="popupCloseBtn" onBtnClick={handleClosePopUp} btnText="x" btnStyle={{ color: "grey", margin: 0, padding: 0 }} />
            </span>
            <h3>{selectedTask.taskName}</h3>
            <p>Date: {selectedTask.date}</p>
            {selectedTask.subtasks.length > 0 && (
              <div className="popupContentDetails">
                <h4>Subtasks:</h4>
                <ul>
                  {selectedTask.subtasks.map((subtask, index) => (
                    <li
                      key={subtask + index}
                      ref={(ref) => (inputRefs.current[index] = ref)}
                      className={index !== currentSubtaskIndex ? "disabled-li" : ""}
                    >
                      <h4>{subtask}</h4>
                      <div>
                        <textarea
                          ref={textareaRef}
                          value={comments[index] || ""}
                          onChange={(e) => handleCommentChange(index, e)}
                          disabled={index !== currentSubtaskIndex}
                          placeholder="Enter your comment (optional)"
                        ></textarea>
                      </div>
                      <div className="ButtonsPopUp">
                        <Button
                          onBtnClick={() => handleAnswerButton(index, "yes")}
                          disabled={index !== currentSubtaskIndex}
                          btnStyle={{ backgroundColor: "green" }}
                          btnText="Yes"
                        />
                        <Button
                          onBtnClick={() => handleAnswerButton(index, "no")}
                          disabled={index !== currentSubtaskIndex}
                          btnStyle={{ backgroundColor: "red" }}
                          btnText="No"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                {currentSubtaskIndex === selectedTask.subtasks.length && (
                  <Button onBtnClick={fullHandleSubmitLogic} btnText="Submit" btnStyle={{ backgroundColor: "#0B3954" }} />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ActiveTaskPopUp;
