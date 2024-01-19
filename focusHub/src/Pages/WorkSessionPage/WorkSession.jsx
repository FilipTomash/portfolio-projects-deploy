import "./WorkSession.css";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import Aside from "../../Layouts/Aside/Aside";
import Button from "../../Components/Button/Button";
import TaskForm from "../../Components/TasksForm/TaskForm";
import Section from "../../Components/TaskSectionContainer/TaskSectionContainer";
import ActiveTaskPopUp from "../../Components/ActiveTaskPopUp/ActiveTaskPopUp";
import ResultPopUp from "../../Components/ResultPopUp/ResultPopUp";

const WorkSession = () => {
  const textareaRef = useRef(null);

  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [result, setResult] = useState(0);
  const [devident, setDevident] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);
  const [percentage, setPercentage] = useState(0);

  // Retrieve existing sections from local storage
  const storedSections = localStorage.getItem("sections");
  const initialSections = storedSections ? JSON.parse(storedSections) : [];

  const [sections, setSections] = useState(initialSections);

  const [isCustom, setIsCustom] = useState(false);

  const onChecklistAdd = (type) => {
    if (type === "CUSTOM") setIsCustom(true);
    if (type === "PREDEFINED") setIsCustom(false);

    setShowForm(true);
  };

  const handleFormSubmit = ({ taskName, sectionName, subtasks, date }) => {
    const newId = generateUniqueId();
    const newSection = {
      id: newId,
      sectionName,
      tasks: [
        {
          taskId: newId,
          taskName,
          subtasks,
          date,
          percentage,
        },
      ],
    };

    setSections([...sections, newSection]);

    setShowForm(false);
    setComments("");
    setResult(0);
    setDevident(0);
    setPercentage(0);
    setShowResultModal(false);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  function generateUniqueId() {
    const timestamp = Date.now().toString(36);
    const randomNum = Math.random().toString(36).substring(2, 9);
    const uniqueId = timestamp + randomNum;
    return uniqueId;
  }

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCommentChange = (index, e) => {
    const updatedComments = [...comments];
    updatedComments[index] = e.target.value;
    setComments(updatedComments);
  };

  const handleResultModalClose = () => {
    setShowResultModal(false);
  };

  const handleSubmit = () => {
    const sectionPercentage = (result / devident) * 100;

    setSections((prevSections) => {
      const updatedSections = prevSections.map((section) => {
        const updatedTasks = section.tasks.filter((task) => task.taskName !== selectedTask.taskName);
        return { ...section, tasks: updatedTasks };
      });

      // Find the section that contains the selected task
      const selectedSection = updatedSections.find((section) => {
        return section.id === selectedTask.taskId;
      });
      console.log("selected section", selectedSection);

      // Updating the percentage of the selected section
      if (selectedSection) {
        selectedSection.percentage = sectionPercentage;
      }
      console.log(updatedSections);
      return updatedSections;
    });

    console.log("the final section from handle Submit", sections);
    console.log("selected task from handle submit", selectedTask);

    const completedSubtasks = selectedTask.subtasks.map((subtask, index) => {
      return {
        subtask,
        comment: comments[index] || "",
      };
    });

    const completedTask = {
      taskName: selectedTask.taskName,
      date: selectedTask.date,
      subtasks: completedSubtasks,
      percentage: sectionPercentage,
      id: selectedTask.taskId,
    };

    const { percentage } = completedTask; // Extracting the percentage value from completedTask

    setPercentage(percentage);

    const storedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    const updatedStoredTasks = [...storedTasks, completedTask];
    localStorage.setItem("completedTasks", JSON.stringify(updatedStoredTasks));
  };
  return (
    <div className="WorkSession">
      <Aside />
      <div className="workSessionContent">
        <div className="Headings">
          <h2>
            Work Session <FontAwesomeIcon icon={faBell} />
          </h2>
          <div className="ButtonsAdd">
            <Button onBtnClick={() => onChecklistAdd("CUSTOM")} btnText="+ Add Custom Checklist" className="add-task-button" />
            <Button onBtnClick={() => onChecklistAdd("PREDEFINED")} btnText="+ Add Predefined Checklist" className="add-task-button" />
          </div>
        </div>
        <div className="notificationBell">{/* <FontAwesomeIcon icon={faBell} /> */}</div>

        {sections.length === 0 ? (
          <p>No tasks added. Click the "Add Task" button to get started.</p>
        ) : (
          sections.map((section, sectionIndex) => (
            <Section
              className="taskSections"
              key={sectionIndex}
              id={section.id}
              sectionName={section.sectionName}
              tasks={section.tasks}
              selectedTask={selectedTask}
              handleTaskClick={handleTaskClick}
              percentage={section.percentage}
            />
          ))
        )}
      </div>

      {showForm && (
        <div className="popupContainer">
          <TaskForm isCustom={isCustom} handleFormSubmit={handleFormSubmit} setShowForm={setShowForm} />
        </div>
      )}

      {selectedTask && (
        <div className="popupContainer">
          <ActiveTaskPopUp
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            sections={sections}
            comments={comments}
            handleCommentChange={handleCommentChange}
            textareaRef={textareaRef}
            result={result}
            setResult={setResult}
            setShowResultModal={setShowResultModal}
            devident={devident}
            setDevident={setDevident}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
      {showResultModal && <ResultPopUp handleResultModalClose={handleResultModalClose} percentage={percentage} />}
    </div>
  );
};

export default WorkSession;
