import React, { useState, useEffect } from "react";
import API from "../../utils/API";

// import "./TaksForm.css"

function Tasks(props) {
    const finishTask = (item) => {

        console.log("here", item)
        var GoalId = props.goalId;
        var TaskId = item._id;
        var pastTask = {
            name: item.name,
            createdAt: item.createdAt,
            targetDate: item.targetDate,
            completed: !item.complete,
            _id: item._id
        };

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
                <div>
                    <p key={props.task._id}>{props.task.name}</p>
                    <p>{props.task.targetDate}</p>
                    <p>{props.task.complete ? 'true' : 'false'}</p>
                    <div onClick={() => finishTask(props.task)}><i className="material-icons">check_circle</i></div>
                    <div onClick={() => removeTask(props.task)}><i className="material-icons">delete</i></div>
                </div>

            </div>
        </div >
    );
}


export default Tasks;