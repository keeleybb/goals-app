import React, { useState, useEffect } from "react";
import API from "../utils/API";
import GoalList from "../components/GoalList"
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
            <h1>Set a new goal</h1>
            <form>
                <input
                    onChange={handleInputChange}
                    name="goal"
                    placeholder="Enter a new goal"
                    value={formObject.goal}

                />
                <label>Target Date</label>
                <input onChange={handleInputChange} type="date" name="targetDate" id="targetDate" value={formObject.targetDate}></input>
                <button
                    disabled={!(formObject.goal)}
                    onClick={handleFormSubmit}
                >
                    Submit Goal
                    </button>
            </form>

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
