import React, { useState } from "react";

function ToDoList() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        //if condition to prevent add an empty task
        if(newTask.trim() !== "") {
            setTasks(t => [...t, { text: newTask, checked: false}]);

            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        //the index needs to be bigger than zero to not be on top
        if(index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]]
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        //if task already at the bottom, doesn't need to go down
        if(index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]]
            setTasks(updatedTasks);
        }
    }

    function handleCheckedTask(index) {
        const updatedTasks = tasks.map((task, i) => 
            i === index ? { ...task, checked: !task.checked } : task
        );

        // Move the checked task to the end
        const [task] = updatedTasks.splice(index, 1);
        updatedTasks.push(task);
        setTasks(updatedTasks);
    }

    return(
       <div className="to-do-list-container">
        <h1>To Do List</h1>
            <div>
                <input type="text" placeholder="Enter a task" value={newTask} onChange={handleInputChange}/>
                <button className="add-button" onClick={addTask}>Add</button>
            </div>

            <ol>
                {tasks.map((task, index) => 
                    <li key={index}>
                        <span className={`task ${task.checked ? "task-checked" : "task-unchecked"}`}>{task.text}</span>
                        <img className="image-check" src="./src/assets/vector-image.png" alt="Check image" onClick={() => handleCheckedTask(index)}></img>
                        {!task.checked && (
                            <>
                                <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                                <button className="move-up-button" onClick={() => moveTaskUp(index)}>UP</button>
                                <button className="move-down-button" onClick={() => moveTaskDown(index)}>DOWN</button>
                            </>
                        )}
                    </li>)}
            </ol>
       </div>
    );
}

export default ToDoList