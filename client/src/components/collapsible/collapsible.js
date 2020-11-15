import React, { Component } from 'react';
import TaskForm from "../TaskForm/TaskForm"
import "./collapsible.css"

class Collapse extends Component {
    constructor() {
        super();

        // Initial state
        this.state = { open: false };

    }

    toggle() {
        console.log(this.props.tasks)
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        return (
            <div className="cart">
                <div className="progress blue lighten-4" onClick={this.toggle.bind(this)} >
                    <div className="determinate blue right-align" style={{ width: this.props.percentage(this.props.tasks), animation: "grow 2s", color: "white", padding: "8px 0px" }}>&nbsp;{this.props.percentage(this.props.tasks)}&nbsp;</div>
                </div>
                {/* <button className="btn btn-block" onClick={this.toggle.bind(this)}>
                              Open/close
         </button> */}
                <div id="demo" className={"collapse" + (this.state.open ? ' in' : '')}>
                    <div>
                        <TaskForm tasks={this.props.tasks} goalId={this.props.goalId} loadGoals={this.props.loadGoals} formObject={this.props.formObject} handleTaskFormSubmit={this.props.handleTaskFormSubmit} handleInputChange={this.props.handleInputChange} />
                    </div>
                </div>
            </div>
        );
    }

};

export default Collapse;