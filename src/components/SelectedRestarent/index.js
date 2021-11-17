import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import RestDetails from '../RestDetails'
import RestDishes from '../RestDishes'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SelectedRestarent extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    RData: {},
    FItems: [],
  }

  componentDidMount() {
    this.getRestDetails()
  }

  getRestDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {RData, FItems} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const RestrentData = [data].map(each => ({
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        id: each.id,
        itemsCount: each.items_count,
        imageUrl: each.image_url,
        location: each.location,
        name: each.name,
        opensAt: each.opens_at,
        rating: each.rating,
        reviewsCount: each.reviews_count,
      }))
      const FoodItems = data.food_items.map(each => ({
        costC: each.cost,
        foodType: each.food_type,
        idC: each.id,
        imageUrl2: each.image_url,
        name2: each.name,
        rating2: each.rating,
      }))
      console.log(FoodItems)
      console.log(...RestrentData)
      this.setState({
        RData: {...RestrentData},
        FItems: FoodItems,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 400) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderRData = () => {
    const {RData, FItems} = this.state
    const one = {...RData[0]}
    console.log(one)

    return (
      <div className="R-top-container">
        <div>
          <img alt="restaurant" className="RImage" src={one.imageUrl} />
        </div>
        <div className="container0">
          <h1 className="head">{one.name}</h1>
          <p className="para-loc">{one.location}</p>
          <div className="card1">
            <div className="card-rat">
              <p className="para-rat">
                <span>
                  <BsFillStarFill className="b-star" />
                </span>
                {one.rating}
                <br />
                <span className="para-rev">
                  {one.reviewsCount} + ratings
                </span>{' '}
              </p>
            </div>

            <hr className="hr" />

            <div>
              <p className="cst-for-two">
                ₹ {one.costForTwo}
                <br />
                <span className="cst-for-two-para">Cost for two</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderDishData = () => {
    const {RData, FItems} = this.state

    return (
      <div>
        <Header />
        <div>{this.renderRData()}</div>

        <div>
          <ul className="dish-ul">
            {FItems.map(each => (
              <RestDishes eachDetails={each} key={each.id} />
            ))}
          </ul>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure"
      />
      <h1 className="failure-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>

      <Link to="/jobs" className="link">
        <button className="nav-button">Retry</button>
      </Link>
    </div>
  )

  renderFailureViewButton = () => (
    <div>
      <Link to="/">
        <button className="nav-button">Retry</button>
      </Link>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="restaurant-details-loader">
      <Loader type="TailSpin" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderAllrestData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderDishData()
      case apiStatusConstants.failure:
        return this.renderFailureViewButton()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {RData, FItems} = this.state

    return <div>{this.renderAllrestData()}</div>
  }
}

export default SelectedRestarent
