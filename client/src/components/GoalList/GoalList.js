import React, { useState } from 'react'
// import API from '../../utils/API'
import "./GoalList.css"
import TaskForm from "../TaskForm/TaskForm"
import Collapsible from "../collapsible/collapsible"

export default function GoalList(props) {

    function percentage(tasks) {
        // console.log(props.tasks)
        var count = tasks.reduce((accumulator, goal) => {
            if (goal.complete) {
                return accumulator + 1
            }
            else {
                return accumulator
            }

        }, 0)
        // console.log("count:", count)
        // console.log("length ", tasks.length)
        // console.log("divide ", (count / tasks.length))
        if (tasks.length === 0) {
            // console.log("No tasks")
            return 0 + "%"
        } else {
            var percent = (count / tasks.length) * 100;
            console.log("Percent for one goal: ", percent)
            return percent + "%"
        }

    }
    return (
        <div className="goal">
            <h5><b>Goal: {props.goal}</b>   <button className="btn" onClick={() => props.deleteGoal(props.goalId)}><i className="material-icons">delete</i></button></h5>
            <Collapsible percentage={percentage} tasks={props.tasks} goalId={props.goalId} loadGoals={props.loadGoals} formObject={props.formObject} handleTaskFormSubmit={props.handleTaskFormSubmit} handleInputChange={props.handleInputChange} />
            {/* <div className="progress">
                <div className="determinate" style={{ width: percentage(props.tasks) }}>{percentage(props.tasks)}</div>
            </div>
            <h5><b>Goal: {props.goal}</b>   <button onClick={() => props.deleteGoal(props.goalId)}>I give up</button></h5>
            <TaskForm tasks={props.tasks} goalId={props.goalId} loadGoals={props.loadGoals} formObject={props.formObject} handleTaskFormSubmit={props.handleTaskFormSubmit} handleInputChange={props.handleInputChange} /> */}
        </div >
    )
}
