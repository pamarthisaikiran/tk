import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Navbar, Nav, Container} from 'react-bootstrap'
import Cookies from 'js-cookie'

import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'

class Header extends Component {
  state = {
    clr: true,
    clrCart: false,
    textH: 'navhome',
    textC: 'navCart',
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  /* color = () => {
    const {clr} = this.state
    this.setState(pre => ({
      clr: !pre.clr,
    }))

    const Navcolor = clr ? `colorNavHome` : `navhome`

    this.setState({
      textH: Navcolor,
    })
  } */

  /* colorCart = () => {
    const {clr} = this.state

    this.setState(
      pre => ({
        clr: !pre.clr,
      }),
      this.renderNav,
    )
  } */

  renderNav = () => {
    const {textH, textC, clr} = this.state
    const Navcolor = clr ? `navhome` : `colorNav`
    return (
      <>
        <Navbar className="bgg" bg="light-blue-gray" expand="lg">
          <Container className="cont">
            <Navbar.Brand href="#home">
              <div className="navCon">
                <img src="https://res.cloudinary.com/ddbhluguf/image/upload/v1634469329/Vector_10x_ay1xq6.png" />
                <h1 className="navHead">Tasty Kitchen</h1>
              </div>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <div className=" flex ">
                  <Nav.Link as={Link} to="/">
                    <button onClick={this.color} className="navhome">
                      Home
                    </button>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/cart">
                    <button onClick={this.colorCart} className="navCart">
                      Cart{' '}
                    </button>
                  </Nav.Link>
                  <Nav.Link>
                    <button onClick={this.onClickLogout} className="navButton">
                      Logout
                    </button>
                  </Nav.Link>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    )
  }

  render() {
    const {textH, textC, clr} = this.state
    const Navcolor = clr ? `navhome` : `colorNav`
    return <>{this.renderNav()}</>
  }
}

export default withRouter(Header)
