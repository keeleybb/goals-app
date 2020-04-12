import React, { useState, useEffect } from "react";
import API from "../../utils/API";

// import "./TaksForm.css"

function TaskForm(props) {
    // Setting our component's initial state
    const [task, setTask] = useState([])
    // const [goal, setGoal] = useState([])
    const [targetDate, setTargetDate] = useState([])
    const [formObject, setFormObject] = useState({})

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    function handleTaskFormSubmit(event) {
        event.preventDefault();
        var GoalId = event.target.attributes.getNamedItem('data-name').value;
        if (formObject.task) {
            API.saveTask(GoalId, {
                _id: GoalId,
                Tasks: [{
                    name: formObject.task,
                    targetDate: formObject.targetDate
                }]
            })
                .then(() => setFormObject({
                    task: "",
                    targetDate: ""
                }))
                .then(() => props.loadGoals())

                .catch(err => console.log(err));
        }
    };
    const finishTask = (item) => {

        // console.log("here", item)
        var GoalId = props.goalId;
        var TaskId = item._id;
        var pastTask = {
            name: item.name,
            createdAt: item.createdAt,
            targetDate: item.targetDate,
            completed: !item.complete,
            _id: item._id
        };
        // console.log("Past Task: ", pastTask)
        // console.log("what is the opposite? ", item.completed === true ? false : true)
        // console.log("what is the opposite? ", pastTask.completed, item.complete)
        // console.log("task", task)
        API.completeTask(GoalId, {
            _id: TaskId,
            Tasks: [{
                ...pastTask
            }]
        })

            .then(() => props.loadGoals())
            .catch(err => console.log(err));
    }
    const removeTask = (item) => {

        // console.log("here", item)
        var GoalId = props.goalId;
        var TaskId = item._id;
        var pastTask = {
            name: item.name,
            createdAt: item.createdAt,
            targetDate: item.targetDate,
            completed: item.complete,
            _id: item._id
        };
        // console.log("Past Task: ", pastTask)
        // console.log("task", task)
        API.removeTask(GoalId, {
            _id: TaskId,
            Tasks: [{
                ...pastTask
            }]
        })

            .then(() => props.loadGoals())
            .catch(err => console.log(err));
    }

    return (
        <div>
            <form>
                <input
                    onChange={handleInputChange}
                    name="task"
                    placeholder="Add a Task to get started"
                    value={formObject.task}

                />
                <input onChange={handleInputChange} type="date" name="targetDate" id="targetDate" value={formObject.targetDate}></input>
                <br />
                <button
                    disabled={!(formObject.task)}
                    onClick={handleTaskFormSubmit}
                    data-name={props.goalId}
                >Add a Task
                    </button>
            </form>

            <div className="row">
                {props.tasks.map(item => {
                    // console.log(key = { item.name })
                    return (
                        <div>
                            <p key={item._id}>{item.name}</p>
                            <p>{item.targetDate}</p>
                            <p>{item.complete ? 'true' : 'false'}</p>
                            <div onClick={() => finishTask(item)}><i className="material-icons">check_circle</i></div>
                            <div onClick={() => removeTask(item)}><i className="material-icons">delete</i></div>
                        </div>
                    )
                })}
            </div>
        </div >
    );
}


export default TaskForm;