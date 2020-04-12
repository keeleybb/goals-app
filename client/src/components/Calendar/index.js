import React, { useEffect, useState , useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import userContext from "../../utils/userContext"
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export default () => {
    const {goals} = useContext(userContext)
    console.log(goals)
    let [calendarEvent, setCalendarEvent] = useState({
        events: [
            {
                start: moment().toDate(),
                end: moment().add(1, "days").toDate(),
                title: "Build this thingy!"
            }
        ]
    }) 
    
    useEffect(()=>{
        console.log(goals)
        const tasks = goals[0].Tasks.map(a=> {return {title:a.name, start: moment().toDate(),
            end: moment().add(1, "days").toDate()}})
            console.log(tasks)
        setCalendarEvent({events:tasks})
    },[goals])

    const onEventResize = (type, { event, start, end, allDay }) => {
        console.log("start: ", start, "end: ", end,  "event: " , event)
        setCalendarEvent({
            events: [{start: start, end:end, title:calendarEvent.events[0].title}]
        });
        // return { events: calendarEvent.events }
    }

   const onEventDrop = ({ event, start, end, allDay }) => {
       console.log("start: ", start, "end: ", end,  "event: " , event)
    setCalendarEvent({
        events: [{start: start, end:end, title:calendarEvent.events[0].title}]
    })
    }

    return(
        <div className="Calendar">
            <DnDCalendar
                defaultDate = { moment().toDate() }
                defaultView = "month"
                events = { calendarEvent.events }
                localizer = { localizer }
                onEventDrop = { onEventDrop }
                onEventResize = { onEventResize }
                resizable
                style = {{ height: "100vh" }}
            />
        </div>
    )
}

// class CalendarEvent extends Component {
//     state = {
//       events: [
//         {
//           start: moment().toDate(),
//           end: moment()
//             .add(1, "days")
//             .toDate(),
//           title: "Some title"
//         }
//       ]
//     };
  
//     onEventResize = (type, { event, start, end, allDay }) => {
//       this.setState(state => {
//         state.events[0].start = start;
//         state.events[0].end = end;
//         return { events: state.events };
//       });
//     };
  
//     onEventDrop = ({ event, start, end, allDay }) => {
//       console.log(start);
//     };
  
//     render() {
//       return (
//         <div className="CalendarEvent">
//           <DnDCalendar
//             defaultDate={moment().toDate()}
//             defaultView="month"
//             events={this.state.events}
//             localizer={localizer}
//             onEventDrop={this.onEventDrop}
//             onEventResize={this.onEventResize}
//             resizable
//             style={{ height: "100vh" }}
//           />
//         </div>
//       );
//     }
//   }
  
//   export default CalendarEvent;yy