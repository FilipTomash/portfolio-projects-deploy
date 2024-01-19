import React, { useState } from "react";
import Aside from "../../Layouts/Aside/Aside";
import "./RemindersPage.css";
import Button from "../../Components/Button/Button";
import { FaClock } from 'react-icons/fa';


const RemindersPage = () => {
  const [reminderData, setReminderData] = useState([
    { id: 1, title: "Meeting at 10:00 AM" },
    { id: 2, title: "Buy groceries" },
    { id: 3, title: "Call John" },
    { id: 4, title: "Meeting at 10:00 AM" },
    { id: 5, title: "Buy groceries" },
    { id: 6, title: "Call John" },
    { id: 7, title: "Meeting at 10:00 AM" },
    { id: 8, title: "Buy groceries" },
    { id: 9, title: "Call John" },
    { id: 10, title: "Refactor code" },
  ]);

  const handleDeleteReminder = (id) => {
    setReminderData((prevData) =>
      prevData.filter((reminder) => reminder.id !== id)
    );
  };

  const renderReminders = () => {
    return reminderData.map((reminder) => (
      <li key={reminder.id} className="reminder-card">
        <span className="reminder-title">{reminder.title}</span>
        <Button
          onBtnClick={() => {
            handleDeleteReminder(reminder.id);
          }}
          btnText="Complete"
          className="reminder-delete-btn"
        />
      </li>
    ));
  };

  return (
    <div className="RemindersMain">
      <Aside style={{ width: "200px" }} />
      <div className="reminders-container">
        <h1>
          <FaClock className="clock-icon" /> Reminders
        </h1>
        <p className="polite-message">
          This is a productivity app to help you stay organized. Below are the reminders for your day:
        </p>
        {reminderData.length === 0 ? (
          <p className="no-reminders-message">
            No reminders available at the moment. Take a moment to relax and recharge before tackling your next set of tasks. You got this!
          </p>
        ) : (
          <ul className="reminders-list">{renderReminders()}</ul>
        )}
      </div>
    </div>
  );
};

export default RemindersPage;
