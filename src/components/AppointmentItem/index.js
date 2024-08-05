// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {data, toggleStar} = props
  const {id, name, formattedDate, isStarred} = data
  const handleClick = () => {
    toggleStar(id)
  }
  const imgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="item">
      <div className="name-star-container">
        <p>{name}</p>
        <button
          onClick={handleClick}
          className="star-button"
          type="button"
          data-testid="star"
        >
          <img src={imgUrl} alt="star" />
        </button>
      </div>
      <p className="date">{formattedDate}</p>
    </li>
  )
}

export default AppointmentItem
