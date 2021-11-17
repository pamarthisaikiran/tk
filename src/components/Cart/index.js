import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import CartData from '../CartData'
import './index.css'

class Cart extends Component {
  state = {
    parsedDataState: [],
    price: 0,
    count: 0,
    gTotal: 0,
    placeOrder: false,
  }

  componentDidMount() {
    this.data()
  }

  data = () => {
    const {parsedDataState, total, price, count} = this.state
    const localData = localStorage.getItem('cartData')
    const parsedData = JSON.parse(localData)
    console.log(parsedData)
    this.setState(
      {
        parsedDataState: parsedData,
      },
      this.onTotal,
    )
  }

  onDeleteItem = id => {
    const {parsedDataState} = this.state
    const filteredData = parsedDataState.filter(each => each.id !== id)
    this.setState({parsedDataState: filteredData})
  }

  onIncrementPrice = id => {
    const {parsedDataState} = this.state
    const filteredData = parsedDataState.filter(each => each.id === id)
    this.setState({parsedDataState: filteredData})
  }

  onTotal = () => {
    const {parsedDataState, gTotal} = this.state
    if (parsedDataState !== null && parsedDataState.length > 0) {
      const total = parsedDataState.reduce(
        (acc, tot) => acc + tot.cost * tot.count,
        0,
      )

      this.setState({
        gTotal: total,
      })
    }
  }

  onChangeTotal = cost => {
    const {parsedDataState} = this.state

    this.setState(pre => ({
      gTotal: pre.gTotal + cost,
    }))
  }

  onPlaceOrder = () => {
    this.setState({
      placeOrder: true,
    })
    localStorage.removeItem('cartData')
  }

  onChangeTotalMinus = cost => {
    const {parsedDataState} = this.state

    this.setState(pre => ({
      gTotal: pre.gTotal - cost,
    }))
  }

  renderCartData = () => {
    const {parsedDataState, price, count, gTotal} = this.state
    return (
      <div>
        <Header />
        <div className="cart-card">
          <div className="ul-all">
            <ul>
              <li className="list">
                <p className="item">Item</p>
                <p className="quan"> Quantity</p>
                <p className="price">Price</p>
              </li>
              {parsedDataState.map(each => (
                <CartData
                  eachDetails={each}
                  key={each.id}
                  onDeleteItem={this.onDeleteItem}
                  onChangeTotal={this.onChangeTotal}
                  onChangeTotalMinus={this.onChangeTotalMinus}
                />
              ))}
            </ul>
            <hr className="hr" />
            <div className="gtotal">
              <p className="order">Order Total:</p>
              <div>
                <p className="total">₹ {gTotal}.00</p>
                <button onClick={this.onPlaceOrder} className="porder">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  renderReuestedFormat = () => {
    const {parsedDataState} = this.state
    let dataOfCart
    if (parsedDataState !== null && parsedDataState.length > 0) {
      dataOfCart = this.renderCartData()
    } else {
      dataOfCart = (
        <div>
          <Header />

          <div className="emp-card">
            <div className="emp-cart">
              <img
                className="emp-img"
                src="https://res.cloudinary.com/ddbhluguf/image/upload/v1636779896/Screenshot_407_wfzfp5.png"
              />
              <h1 className="emp-head">No Orders Yet!</h1>
              <p className="emp-para">
                Your cart is empty. Add something from the menu.
              </p>
              <Link to="/">
                <button className="emp-button">Order Now</button>
              </Link>
            </div>
          </div>
        </div>
      )
    }
    return dataOfCart
  }

  finalCartData = () => {
    const {placeOrder} = this.state
    let placeOrderData

    if (placeOrder) {
      placeOrderData = (
        <div>
          <Header />
          <div className="plc-card">
            <div className="plc-cart">
              <img
                className="plc-img"
                src="https://res.cloudinary.com/ddbhluguf/image/upload/v1636782469/Screenshot_412_cg14mi.png"
              />
              <h1 className="plc-head">Payment Successful</h1>
              <p className="plc-para">
                Thank you for ordering.Your payment is successfully completed.
              </p>
              <Link to="/">
                <button className="plc-button">Go To Home Page</button>
              </Link>
            </div>
          </div>
        </div>
      )
    } else {
      placeOrderData = this.renderReuestedFormat()
    }
    return placeOrderData
  }

  render() {
    const {parsedDataState, price, count, gTotal} = this.state
    console.log(parsedDataState)

    /* let total = parsedDataState.reduce(
      (acc, tot) => acc + tot.costC * tot.countC,
      0,
    ) */

    return <div>{this.finalCartData()}</div>
  }
}

export default Cart
