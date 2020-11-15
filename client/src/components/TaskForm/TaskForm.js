import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Tasks from "../Tasks/Tasks"

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
        console.log("from task from", props.tasks)
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
            <div className="row">
                <form>
                    <input
                        style={{ width: "60%" }}
                        onChange={handleInputChange}
                        name="task"
                        placeholder="Add a Task to get started"
                        value={formObject.task} />
                    <input onChange={handleInputChange} type="date" name="targetDate" id="targetDate" value={formObject.targetDate} style={{ width: "22%", margin: "0px 20px" }}></input>
                    <button className="btn-small"
                        disabled={!(formObject.task)}
                        onClick={handleTaskFormSubmit}
                        data-name={props.goalId}>Add a Task</button>
                </form>
            </div>
            <div className="row">
                {props.tasks.map(item => {
                    // console.log(key = { item.name })
                    return (
                        <div className="row">
                            <div className="col s12">
                                <h6 key={item._id} style={{ color: item.complete ? '#43a047' : 'black' }}>{item.name}&nbsp;&nbsp;&nbsp;<i className="material-icons" onClick={() => finishTask(item)}>check_circle</i>&nbsp;&nbsp;&nbsp;<i className="material-icons" onClick={() => removeTask(item)}>delete</i></h6>
                                {/* <p>{item.targetDate}</p> */}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    );
}


export default TaskForm;