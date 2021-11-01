import {Component} from 'react'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const localList = []
class RestDishes extends Component {
  state = {
    isActive: false,
    count: 1,
    list: [],
    storelist1: {},
  }

  componentDidMount() {
    this.renderList()
  }

  renderList = () => {
    const {count, list, storelist1} = this.state
    const {eachDetails} = this.props
    const {name2, imageUrl2, rating2, id, foodType, cost} = eachDetails

    if (list.length >= 1) {
      localList.push(...list)
      console.log(localList)
    }

    this.setState({
      storelist1: localList,
    })

    console.log(list)
    localStorage.setItem('cartData', JSON.stringify(storelist1))
  }

  onClickAdd = () => {
    const {count, list} = this.state
    const {eachDetails} = this.props
    const {name2, imageUrl2, rating2, id, foodType, cost} = eachDetails
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }))

    const newList = {
      imageUrl: imageUrl2,
      name: name2,
      costC: cost,
      countC: count,
    }

    this.setState(
      prevState => ({
        list: [...prevState.list, newList],
      }),
      this.renderList,
    )
  }

  onClickMinus = () => {
    const {isActive, count, storelist1, list} = this.state

    if (count === 1) {
      this.setState(prevState => ({
        isActive: !prevState.isActive,
      }))
    }
    if (count > 1) {
      this.setState(
        prevState => ({
          count: prevState.count - 1,
        }),
        this.renderList,
      )
    }
  }

  onClickPlus = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  render() {
    const {isActive, count} = this.state
    const {eachDetails} = this.props
    const {name2, imageUrl2, rating2, id, foodType, cost} = eachDetails

    return (
      <li className="dish-li">
        <img className="dish-image" src={imageUrl2} />
        <div className="dish-con">
          <h1 className="dish-name">{name2}</h1>
          <p className="dish-cost">₹ {cost}.00</p>
          <p className="dish-rating">
            <span className="dish-star">
              <BsFillStarFill />
            </span>
            {rating2}
          </p>
          <div>
            {isActive ? (
              <div className="countBut">
                <button className="minus" onClick={this.onClickMinus}>
                  {' '}
                  -{' '}
                </button>
                <p className="count-para">{count}</p>
                <button className="plus" onClick={this.onClickPlus}>
                  +
                </button>
              </div>
            ) : (
              <button onClick={this.onClickAdd} className="dish-button">
                ADD
              </button>
            )}
          </div>
        </div>
      </li>
    )
  }
}

export default RestDishes
