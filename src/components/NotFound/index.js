import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-container">
      <img
        src="https://res.cloudinary.com/ddbhluguf/image/upload/v1636808494/Screenshot_416_iguyf1.png "
        alt="not found"
        className="not-img"
      />
      <h1 className="not-heading">Page Not Found</h1>
      <p className="not-para">
        we are sorry, the page you requested could not be found.Please go back
        to the homepage
      </p>
      <Link to="/">
        {' '}
        <button className="not-button">Home Page</button>
      </Link>
    </div>
  </>
)

export default NotFound
