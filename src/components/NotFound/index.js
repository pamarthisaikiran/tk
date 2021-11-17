import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div testid="restaurant-item" className="not-container">
      <img
        testid="restaurant-item"
        src="https://res.cloudinary.com/ddbhluguf/image/upload/v1636808494/Screenshot_416_iguyf1.png "
        alt="not found"
        className="not-img"
      />
      <h1 testid="restaurant-item" className="not-heading">
        Page Not Found
      </h1>
      <p testid="restaurant-item" className="not-para">
        we are sorry, the page you requested could not be found
      </p>
      <Link to="/">
        {' '}
        <button testid="restaurant-item" className="not-button">
          Home Page
        </button>
      </Link>
    </div>
  </>
)

export default NotFound
