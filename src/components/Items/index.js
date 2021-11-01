import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const Items = props => {
  const {eachDetails} = props
  const {
    imageUrl,
    id,
    name,
    cuisine,
    ratingColor,
    ratingText,
    totalReviews,
    rating,
  } = eachDetails

  return (
    <Link to={`/rest/${id}`} className="link-item">
      <li className="list">
        <div>
          <img className="imgUrl" alt={name} src={imageUrl} />
        </div>
        <div className="cont1">
          <h1 className="name">{name}</h1>
          <p className="cui">{cuisine}</p>
          <div className="con">
            <BsFillStarFill className="star" />
            <p className="rating">{rating}</p>
            <p className="review">({totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default Items
