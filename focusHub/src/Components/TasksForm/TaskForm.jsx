import Button from "../Button/Button";
import { predefinedLists } from "../../data/predefined-list.data.json";
import { useEffect, useState } from "react";

const listKeys = Object.keys(predefinedLists);

const TaskForm = ({ handleFormSubmit, setShowForm, isCustom }) => {
  const [sectionName, setSectionName] = useState(isCustom ? "" : listKeys[0]);

  const [taskName, setTaskName] = useState(isCustom ? "" : predefinedLists.bartenderClose.clName);

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const [subtasks, setSubtasks] = useState(isCustom ? [""] : predefinedLists.supervisorUtilities.items);

  useEffect(() => {
    if (!sectionName || isCustom) return;

    // Change the substasks and taskname
    console.log(sectionName);

    setTaskName(predefinedLists[sectionName].clName + "  " + new Date().toISOString().slice(0, 19));
    setSubtasks(predefinedLists[sectionName].items);
  }, [sectionName]);

  console.log(listKeys);
  console.log(predefinedLists);

  const handleSubtaskChange = (index, e) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = e.target.value;
    setSubtasks(updatedSubtasks);
  };

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, ""]);
  };

  const handleRemoveSubtask = (index) => {
    setSubtasks((prevState) => prevState.filter((_, i) => i !== index));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const section = isCustom ? sectionName : predefinedLists[sectionName].clName;

        handleFormSubmit({ subtasks, taskName, sectionName: section, date });
      }}
      className="forma"
    >
      <div className="form-group">
        <label htmlFor="sectionName">Section Name:</label>
        {isCustom ? (
          <input type="text" id="sectionName" value={sectionName} onChange={(e) => setSectionName(e.target.value)} />
        ) : (
          <select id="sectionName" value={sectionName} onChange={(e) => setSectionName(e.target.value)}>
            {listKeys.map((key) => (
              <option key={key} value={key}>
                {predefinedLists[key].clName}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="taskName">Task Name:</label>
        <input type="text" id="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Subtasks:</label>
        {subtasks.map((subtask, index) => (
          <div key={index} className="subtask-input-container">
            <input type="text" value={subtask} onChange={(e) => handleSubtaskChange(index, e)} className="input-subtask" required />
            <Button type="button" onBtnClick={() => handleRemoveSubtask(index)} btnText="-" className="remove-subtask-button" />
          </div>
        ))}

        <Button type="button" onBtnClick={handleAddSubtask} btnText="+" className="add-subtask-button" />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div className="formButtons">
        <Button btnText="Submit" type="submit" />
        <Button onBtnClick={() => setShowForm(false)} btnText="Close" />
      </div>
    </form>
  );
};

export default TaskForm;
