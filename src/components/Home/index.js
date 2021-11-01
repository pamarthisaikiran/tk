import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {BsChevronRight, BsChevronLeft} from 'react-icons/bs'

import Cookies from 'js-cookie'
import Slider from 'react-slick'

import Header from '../Header'

import Items from '../Items'

import ProductsHeader from '../ProductsHeader'

import Footer from '../Footer'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    carosalData: {},
    productsList: [],
    activePage: 1,
    searchInput: '',
    selectedSortByValue: sortByOptions[0].value,
  }

  componentDidMount() {
    this.renderProducts()
    this.getCarosalImgs()
  }

  OnIncrement = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevSta => ({
          activePage: prevSta.activePage + 1,
        }),
        this.renderProducts,
      )
    }
  }

  onDecrement = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevSta => ({
          activePage: prevSta.activePage - 1,
        }),
        this.renderProducts,
      )
    }
  }

  getData = data => ({
    id: data.id,
    imageUrl: data.image_url,
  })

  getCarosalImgs = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(
      'https://apis.ccbp.in/restaurants-list/offers',
      options,
    )
    if (response.ok === true) {
      const data = await response.json()

      const imgData = data.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))
      this.setState({
        carosalData: imgData,
      })
    }
  }

  renderSider = () => {
    const {carosalData} = this.state
    console.log(carosalData)

    const one = {...carosalData[0]}
    const two = {...carosalData[1]}
    const three = {...carosalData[2]}
    const four = {...carosalData[3]}

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    return (
      <div className="container">
        <Slider {...settings}>
          <div>
            <img className="imgC" src={one.imageUrl} />
          </div>
          <div>
            <img className="imgC" src={two.imageUrl} />
          </div>
          <div>
            <img className="imgC" src={three.imageUrl} />
          </div>
          <div>
            <img className="imgC" src={four.imageUrl} />
          </div>
        </Slider>
      </div>
    )
  }

  /*  = data => ({
    rating: data.rating,
    ratingColor: data.rating_color,
    ratingText: data.rating_text,
    totalReviews: data.totalReviews,
  }) */

  renderProducts = async () => {
    const {
      productsList,
      activePage,
      searchInput,
      selectedSortByValue,
    } = this.state
    const limit = 9
    const LIMIT = limit
    const offset = (activePage - 1) * limit
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${LIMIT}&sort_by_rating=${selectedSortByValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const restData = data.restaurants.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
        cuisine: each.cuisine,
        ratingColor: each.user_rating.rating_color,
        ratingText: each.user_rating.rating_text,
        totalReviews: each.user_rating.total_reviews,
        rating: each.user_rating.rating,
        id: each.id,
      }))

      this.setState({
        productsList: [...restData],
      })
    }
  }

  changeSortby = selectedSortByValue => {
    this.setState({selectedSortByValue}, this.renderProducts)
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const {productsList, activePage, selectedSortByValue} = this.state
    console.log(productsList)

    return (
      <div>
        <div>
          <Header />
        </div>

        {this.renderSider()}

        <div>
          <ProductsHeader
            selectedSortByValue={selectedSortByValue}
            sortByOptions={sortByOptions}
            changeSortby={this.changeSortby}
          />

          <ul className="ul-list">
            {productsList.map(each => (
              <Items eachDetails={each} key={each.id} />
            ))}
          </ul>
        </div>

        <div className="buttons">
          <button onClick={this.onDecrement} className="buttonClick">
            {' '}
            <BsChevronLeft />{' '}
          </button>
          <div className="count">
            <p>{activePage} </p>
            <p> of 4</p>
          </div>
          <button onClick={this.OnIncrement} className="buttonClick">
            {' '}
            <BsChevronRight />{' '}
          </button>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
