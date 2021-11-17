import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  submitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
    this.setState({username: '', password: ''})
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  renderInputUsername = () => {
    const {username} = this.state
    return (
      <>
        <label className="labelUser" htmlFor="username">
          USERNAME
        </label>

        <input
          onChange={this.onChangeUsername}
          className="inputUser"
          id="username"
          value={username}
          type="text"
        />
      </>
    )
  }

  renderInputPassword = () => {
    const {password} = this.state
    return (
      <>
        <label className="labelPass" htmlFor="password">
          PASSWORD
        </label>
        <input
          onChange={this.onChangePassword}
          className="inputPass"
          id="password"
          value={password}
          type="password"
        />
      </>
    )
  }

  renderFromMed = () => {
    ;<div className="card">
      <div className="card2">
        <form className="form" onSubmit={this.onSubmitForm}>
          <img
            alt="website logo"
            src="https://res.cloudinary.com/ddbhluguf/image/upload/v1634469329/Vector_10x_ay1xq6.png"
          />
          <h1 className="heading">Tasty Kitchens</h1>
          <h1 className="loginHead">Login</h1>
          <div className="con1">{this.renderInputUsername()} </div>
          <div className="con2"> {this.renderInputPassword()}</div>
          <button className="button">Login</button>
        </form>
      </div>
      <img
        className="img1"
        src="https://res.cloudinary.com/ddbhluguf/image/upload/v1634400021/Rectangle_1456_1x_ixsive.png"
      />
    </div>
  }

  renderFromSmall = () => {
    let k
    return (
      <div className="smallDev">
        <img
          alt="website login"
          src="https://res.cloudinary.com/ddbhluguf/image/upload/v1634535030/Rectangle_1457_1px_duz6ai.png"
        />
        <form>
          <div className="con1">{this.renderInputUsername()} </div>
          <div className="con2"> {this.renderInputPassword()}</div>
          <button className="button">Login</button>
        </form>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {showSubmitError, errorMsg} = this.state
    return (
      <div testid="rest" className="cardMain">
        <div className="card2">
          <form className="form" onSubmit={this.onSubmitForm}>
            <div className="smallCard">
              <h1 className="loginHead1">Login</h1>
              <img
                alt="website login"
                className="smallImg"
                src="https://res.cloudinary.com/ddbhluguf/image/upload/v1634535030/Rectangle_1457_1px_duz6ai.png"
              />
            </div>
            <img
              alt="website logo"
              className="logo"
              src="https://res.cloudinary.com/ddbhluguf/image/upload/v1634469329/Vector_10x_ay1xq6.png"
            />
            <h1 className="heading">Tasty Kitchens</h1>
            <h1 className="loginHead2">Login</h1>
            <div className="con1">{this.renderInputUsername()} </div>
            <div className="con2"> {this.renderInputPassword()}</div>
            {showSubmitError && <p>*{errorMsg}</p>}
            <button type="submit" className="button">
              Login
            </button>
          </form>
        </div>
        <img
          className="img1"
          alt="website login"
          src="https://res.cloudinary.com/ddbhluguf/image/upload/v1634400021/Rectangle_1456_1x_ixsive.png"
        />
      </div>
    )
  }
}

export default LoginForm
