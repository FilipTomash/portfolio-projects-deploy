import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";
import Aside from "../../Layouts/Aside/Aside";
import Button from "../../Components/Button/Button";

const DatePickingPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [newTask, setNewTask] = useState("");
  const [dateTasks, setDateTasks] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    console.log(dateTasks[selectedDate]);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date.toDateString());
  };

  const handleAddTask = () => {
    if (newTask === "" || newTask.length <= 3) {
      setShowAlert(true);
      setNewTask("");
      return;
    } else setShowAlert(false);
    setNewTask("");

    setDateTasks((prevData) => {
      const prevTasks = prevData[selectedDate] ? prevData[selectedDate] : [];

      const newTasks = [...prevTasks, newTask];

      return { ...prevData, [selectedDate]: newTasks };
    });

    console.log(dateTasks);
  };

  const handleDeleteTask = (index) => {
    setDateTasks((prevData) => {
      const updatedTasks = [...prevData[selectedDate]];
      updatedTasks.splice(index, 1);
      return { ...prevData, [selectedDate]: updatedTasks };
    });
  };

  return (
    <div className="DatePickingPageContainer">
      <Aside />
      <div className="DatePickingPage">
        <h2 id="addTasksTitle">Coordinate Team Tasks:</h2>
        <div className="DatePickerContainer">
          <DatePicker
            selected={new Date(selectedDate)}
            onChange={handleDateChange}
            calendarClassName="custom-calendar"
            dayClassName={() => "custom-day"}
          />
        </div>
        <div className="AddTaskContainer">
          <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter a new task" />
          <Button onBtnClick={handleAddTask} btnText="Add Task" className="AddTaskButton" />
        </div>
        {showAlert && <div className="alert-bubble">Task must be at least 4 characters long. Please try scheduling a task again.</div>}
        <div className="TasksContainer">
          {/* <h2 style={{ margin: 0 }}>Task Overview for : {selectedDate}</h2> */}
          <ul>
            {dateTasks[selectedDate]?.map((task, index) => (
              <li key={index}>
                <span>{task}</span>
                <Button onBtnClick={() => handleDeleteTask(index)} btnText="X" className="DeleteTaskButton" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DatePickingPage;
