
import { useState } from "react";
import "./calendar.css"

const Calendar = () => {

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthOfYear = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"];

    const CurrentDate = new Date();

    const [currentMonth, setCurrentMonth] = useState(CurrentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(CurrentDate.getFullYear());

    const [selectedDate, setSelectedDate] = useState(CurrentDate);
    const [showEventPopup, setShowEventPopup] = useState(false);

  


    const [eventTime, setEvnetTime] = useState({ hours: "00", minutes: "00" });
    const [eventText, setEvnetText] = useState("");
    const [editingEvent, setEditinEvent] = useState(null);
    const [currentTime ,setCurrentTime] = useState(new Date().toLocaleTimeString());

    setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);



    const [event, setEvent] = useState([
        {
            id: Date.now(),
            date: selectedDate,
            time: `${eventTime.hours.padStart(2, "0")}:${eventTime.minutes.padStart(2, "0")}`,
            text: "Sample Task For Uses",
            isDone: false,
        },

        {
            id: Date.now(),
            date: selectedDate,
            time: `${eventTime.hours.padStart(2, "0")}:${eventTime.minutes.padStart(2, "0")}`,
            text: "Sample Task with done process ",
            isDone: true,
        },
        {
            id: Date.now(),
            date: selectedDate,
            time: `${eventTime.hours.padStart(2, "0")}:${eventTime.minutes.padStart(2, "0")}`,
            text: "Adding new Functionality to imporve use experice ",
            isDone: false,
        }



    ]);

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    // learning state...
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();



    // Previous month

    const prevMonth = () => {
        setCurrentMonth((prevMonth) => prevMonth == 0 ? 11 : prevMonth = prevMonth - 1);
        setCurrentYear((currentYear) => currentMonth == 0 ? currentYear = currentYear - 1 : currentYear)
    }

    const nextMonth = () => {
        setCurrentMonth((prevMonth) => prevMonth == 11 ? prevMonth = 0 : prevMonth = prevMonth + 1);
        setCurrentYear((currentYear) => currentMonth == 11 ? currentYear + 1 : currentYear)
    }

    const handleClicked = (day) => {
        const clickDate = new Date(currentYear, currentMonth, day);
        const today = new Date();

        if (clickDate >= today || isSameDay(clickDate, today)) {
            setSelectedDate(clickDate);
            setShowEventPopup(true);
            setEvnetTime({ hours: "00", minutes: "00" });
            setEvnetText("");
            setEditinEvent(null);
        }
    }

    const isSameDay = (date1, date2) => {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
    }

    const handleSubmitEvent = () => {
        const newEvent = {
            id: editingEvent ? editingEvent.id : Date.now(),
            date: selectedDate,
            time: `${eventTime.hours.padStart(2, "0")}:${eventTime.minutes.padStart(2, "0")}`,
            text: eventText,
            isDone: false,
        }

        console.log(newEvent);
        let updatedEvent = [...event];
        console.log(updatedEvent);

        if (editingEvent) {
            updatedEvent = updatedEvent.map((eve) => eve.id === editingEvent.id ? newEvent : eve)
        } else {
            updatedEvent.push(newEvent);
        }
        updatedEvent.sort((a, b) => new Date(a.date) - new Date(b.date));

        setEvent(updatedEvent);
        setEvnetTime({ hours: "00", minutes: "00" });
        setEvnetText("");
        setShowEventPopup(false);
        setEditinEvent(null);
    }


    const handleEditEvent = (event, i) => {

        console.log(event);
        setSelectedDate(new Date(event[i].date.toString()));
        console.log(selectedDate);

        setEvnetTime({
            hours: event[i].time.split(":")[0],
            minutes: event[i].time.split(":")[1],
        });

        setEvnetText(event[i].text);
        setEditinEvent(event[i]);
        setShowEventPopup(true);
    }


    const handleDoneEvent = (event, i) => {

        setEvent((previous) => {

            return previous.map((e) => e.id === event[i].id ? { ...e, isDone: true } : e);

        }
        )
    }

   const  handleMouseOver =()=>{
       
        
    return  ()=>{
        console.log("helo")
        console.log(this);
    }
    
 
   }

   let res = handleMouseOver();

   let timeChange = currentTime.toString().split(":");
   let hours = timeChange[0];
   let min = timeChange[1];
   let sec = timeChange[2].toString().split(" ")[0];
   let format = timeChange[2].toString().split(" ")[1];

   let timeArr = [hours,min,sec,format];

    return (
        <div className="calendar-app">
            <div className="calendar">
                <div className="time">
                {timeArr.map((time)=><h3>{time}</h3>)}
                </div>
                <h1 className="heading">Calendar</h1>
                <div className="navigate-date">
                    <h2 className="Month">{monthOfYear[currentMonth]}</h2>
                    <h2 className="year">{currentYear}</h2>
                    <div className="button">
                        <i className=" bx bx-chevron-left" onClick={prevMonth}></i>
                        &nbsp;  &nbsp;
                        <i className=" bx bx-chevron-right" onClick={nextMonth}></i>

                    </div>

                </div>
                <div className="weekdays">
                    {daysOfWeek.map((day) => <span key={day}>{day}</span>)}
                </div>
                <div className="days">

                    {[...Array(firstDayOfMonth).keys()].map((_, index) => <span key={`empty${index}`} />)}

                    {[...Array(daysInMonth).keys()].map((day) => <span key={day + 1}
                        className={day + 1 === CurrentDate.getDate() && currentMonth === CurrentDate.getMonth()
                            && currentYear === CurrentDate.getFullYear() ? "current-date" : null

                        } onClick={() => handleClicked(day + 1)}  onMouseEnter={res}>
                        {day + 1}</span>)}

                </div>
            </div>

            <div className="events">

                {showEventPopup &&
                    <div className="event-popup">
                        <div className="time-input">

                            <div className="event-popup-time"> time </div>
                            <input type="number"
                                name="hours" min={0}
                                max={24} className="hours"
                                value={eventTime.hours}
                                onChange={(e) => setEvnetTime({ ...eventTime, hours: e.target.value })}
                            />
                            <input type="number"
                                name="minutes" min={0}
                                max={60} className="minutes"
                                value={eventTime.minutes}
                                onChange={(e) => setEvnetTime({ ...eventTime, minutes: e.target.value })} />

                        </div>

                        <textarea placeholder="Enter Event Test (Maximum No Of Character (60)"
                            value={eventText} onChange={(e) => {
                                if (e.target.value.length <= 60) {
                                    setEvnetText(e.target.value);
                                }
                            }}>

                        </textarea>
                        <button className="event-popup-btn" onClick={handleSubmitEvent}>{editingEvent ? "Update Event" : "Add Event"}</button>4
                        <button className="close-event-popup" onClick={() => setShowEventPopup(false)}>
                            <i className="bx bx-x"></i>
                        </button>

                    </div>}





                {event.map((e, i) => (
                    <div className="event" key={i} id={e.isDone ? "isdone" : null}  >
                        <div className="event-date-wrapper">
                            <div className="event-date">{
                                `${monthOfYear[e.date.getMonth()]},${e.date.getDate()},${e.date.getFullYear()}`}</div>
                            <div className="event-time">{e.time}</div>
                        </div>
                        <div className="event-text">
                            {e.text}
                        </div>
                        <div className="event-buttons">

                            {e.isDone ? null : <i className="bx bxs-edit-alt" onClick={() => handleEditEvent(event, i)}></i>}

                            {e.isDone ? null : <i class="fa-solid fa-check" onClick={() => handleDoneEvent(event, i)}></i>}

                        </div>
                    </div>

                ))}


            </div>

        </div>
    )
}

export default Calendar

