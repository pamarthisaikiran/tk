import {Component} from 'react'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

let localList = []

class RestDishes extends Component {
  state = {
    isActive: false,
    countC: 1,
    list: [],
    storelist1: {},
    isAdded: false,
    qprice: 0,
  }

  componentDidMount() {
    this.renderList()
  }

  componentWillUnmount() {
    localList = []
  }

  renderList = () => {
    const {count, list, storelist1, total} = this.state
    const {eachDetails} = this.props
    const {name2, imageUrl2, rating2, idC, foodType, costC} = eachDetails

    if (list.length >= 1) {
      localList.push(...list)
      console.log(localList)
    }

    this.setState({
      storelist1: localList,
    })

    console.log(list)
    localStorage.setItem('cartData', JSON.stringify(storelist1))
    console.log(storelist1)
  }

  onClickAdd = () => {
    const {countC, list} = this.state
    const {eachDetails} = this.props
    const {name2, imageUrl2, rating2, idC, foodType, costC} = eachDetails
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }))
  }

  onClickMinus = id => {
    const {isActive, countC, storelist1, list} = this.state

    if (countC === 1) {
      this.setState(prevState => ({
        isActive: !prevState.isActive,
      }))
    }
    if (countC > 1) {
      this.setState(prevState => ({
        countC: prevState.countC - 1,
      }))
    }
  }

  onClickPlus = id => {
    const {countC, list, storelist1} = this.state
    const {eachDetails} = this.props
    const {name2, imageUrl2, rating2, idC, foodType, costC} = eachDetails
    this.setState(prevState => ({
      countC: prevState.countC + 1,
    }))

    storelist1.map(each =>
      id === each.id
        ? this.setState(
            prevState => ({
              countC: prevState.countC + 1,
            }),
            this.renderList,
          )
        : each,
    )
  }

  changeText = () => {
    this.setState({isAdded: true})

    const {countC, list, total} = this.state
    const {eachDetails} = this.props
    const {name2, imageUrl2, rating2, idC, foodType, costC} = eachDetails

    const newList = {
      imageUrl: imageUrl2,
      name: name2,
      cost: costC,
      count: countC,
      id: idC,
      qprice: costC * countC,
    }

    this.setState(
      prevState => ({
        list: [...prevState.list, newList],
      }),
      this.renderList,
    )
  }

  render() {
    const {isActive, countC, isAdded} = this.state
    const {eachDetails} = this.props
    const {name2, imageUrl2, rating2, id, foodType, costC} = eachDetails

    return (
      <li testid="foodItem" className="dish-li">
        <img className="dish-image" src={imageUrl2} />
        <div className="dish-con">
          <h1 className="dish-name">{name2}</h1>
          <p className="dish-cost">₹ {costC}.00</p>
          <p className="dish-rating">
            <span className="dish-star">
              <BsFillStarFill />
            </span>
            {rating2}
          </p>
          <div>
            {isActive ? (
              <div className="countBut">
                <button
                  testid="decrement-count"
                  className="minus"
                  onClick={this.onClickMinus}
                >
                  {' '}
                  -{' '}
                </button>
                <p testid="active-count" className="count-para">
                  {countC}
                </p>
                <button
                  testid="increment-count"
                  className="plus"
                  onClick={this.onClickPlus}
                >
                  +
                </button>
                {isAdded ? (
                  <button type="button" className="but">
                    Added to Cart
                  </button>
                ) : (
                  <button
                    type="button"
                    className="but"
                    onClick={this.changeText}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={this.onClickAdd}
                className="dish-button"
              >
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
