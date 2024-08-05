import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns' // Import format from date-fns
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsArray: [],
    originalAppointmentsArray: [], // To store the original list of appointments
    inputValue: '',
    date: '',
    // New state variable for formatted date
    isStarred: false,
    showStarredOnly: false,
  }

  onChangeInputValue = event => {
    this.setState({inputValue: event.target.value})
  }

  handleDate = event => {
    this.setState({date: event.target.value})
  }

  starred = () => {
    this.setState(prevState => {
      const {appointmentsArray, showStarredOnly} = prevState
      if (showStarredOnly) {
        // If currently showing starred only, revert to all appointments
        return {
          appointmentsArray: prevState.originalAppointmentsArray,
          showStarredOnly: false,
        }
      }
      // Filter to show only starred appointments
      const filteredArray = appointmentsArray.filter(each => each.isStarred)
      return {appointmentsArray: filteredArray, showStarredOnly: true}
    })
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsArray: prevState.appointmentsArray.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {inputValue, date, isStarred} = this.state

    // Format the date
    const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: uuidv4(),
      name: inputValue,
      formattedDate,
      isStarred,
    }

    this.setState(prevState => ({
      originalAppointmentsArray: [
        ...prevState.originalAppointmentsArray,
        newAppointment,
      ],
      appointmentsArray: [...prevState.appointmentsArray, newAppointment],
      inputValue: '',
      date: '',
      // Update formatted date state
    }))
  }

  render() {
    const {appointmentsArray, showStarredOnly, inputValue, date} = this.state
    const displayedAppointments = showStarredOnly
      ? appointmentsArray.filter(each => each.isStarred)
      : appointmentsArray

    return (
      <div className="bg-container">
        <div className="appointment-card">
          <div className="form-container">
            <h1>Add Appointment</h1>
            <form onSubmit={this.onAddAppointment}>
              <label htmlFor="input">TITLE</label>
              <br />
              <input
                value={inputValue}
                id="input"
                type="text"
                placeholder="Title"
                onChange={this.onChangeInputValue}
              />
              <br />
              <label htmlFor="dateTime">DATE</label>
              <br />
              <input
                onChange={this.handleDate}
                value={date}
                type="date"
                id="dateTime"
              />
              <br />
              <button type="submit" className="button">
                Add
              </button>
            </form>
          </div>
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="separator" />
          <div className="appointment-container">
            <h1>Appointments</h1>
            <button type="button" onClick={this.starred} className="button">
              Starred
            </button>
          </div>
          <ul className="bottom-container">
            {displayedAppointments.map(each => (
              <AppointmentItem
                toggleStar={this.toggleStar}
                data={each}
                key={each.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
