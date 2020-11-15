import React, { useState, useEffect } from "react";
import API from "../utils/API";
import GoalList from "../components/GoalList"
import "./Goals.css"
// import moment from 'moment';

function Goals() {
    // Setting our component's initial state
    const [goal, setGoal] = useState([])
    const [targetDate, setTargetDate] = useState([])
    const [formObject, setFormObject] = useState({})

    // Load all books and store them with setBooks
    useEffect(() => {
        loadGoals()
    }, [])

    // Loads all books and sets them to books
    function loadGoals() {
        // console.log("Making the call")
        API.getGoals()
            .then(res =>
                setGoal(res.data)
            )
            .catch(err => console.log(err));
    };

    // Deletes a book from the database with a given id, then reloads books from the db
    function deleteGoal(id) {
        API.deleteGoal(id)
            .then(res => loadGoals())
            .catch(err => console.log(err));
    }

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.goal) {
            API.saveGoal({
                goal: formObject.goal,
                targetDate: formObject.targetDate
            })
                .then(() => setFormObject({
                    goal: "",
                    targetDate: ""
                }))
                .then(() => loadGoals())
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col s12">
                    <h2>Set a new goal</h2>
                    <form>
                        <div className="row" >
                            <div className="col s12 m7">
                                <input
                                    onChange={handleInputChange}
                                    name="goal"
                                    placeholder="Enter a new goal"
                                    value={formObject.goal} />
                            </div>
                            <div className="col s12 m5">
                                <input onChange={handleInputChange} type="date" name="targetDate" id="targetDate" value={formObject.targetDate} style={{ width: "200px", margin: "0px 10px" }} />
                                <button className="btn teal darken-2"
                                    disabled={!(formObject.goal)}
                                    onClick={handleFormSubmit}>
                                    Submit Goal</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                {goal.map(goals => {
                    // console.log(goals.Tasks)
                    return <GoalList goal={goals.goal} tasks={goals.Tasks} key={goals.goal} goalId={goals._id} loadGoals={loadGoals} deleteGoal={deleteGoal} />
                })}
            </div>
        </div >
    );
}


export default Goals;
