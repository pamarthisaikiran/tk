import {Link, withRouter} from 'react-router-dom'
import {Navbar, Nav, Container} from 'react-bootstrap'
import Cookies from 'js-cookie'

import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <Navbar className="bgg" bg="light-blue-gray" expand="lg">
        <Container>
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
                  <span className="navhome">Home</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  <span className="navCart">Cart </span>
                </Nav.Link>
                <Nav.Link>
                  <button onClick={onClickLogout} className="navButton">
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

export default withRouter(Header)
