import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const ProductsHeader = props => {
  const {sortByOptions, selectedSortByValue} = props
  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }
  return (
    <div className="sortHeader">
      <h1>Popular Restaurants</h1>
      <div className="sort">
        <p>
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
        <div className="sorted">
          <BsFilterRight className="sort-by-icon" />
          <select
            className="sort-by-select"
            value={selectedSortByValue}
            onChange={onChangeSortby}
          >
            {sortByOptions.map(each => (
              <option>{each.displayText}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default ProductsHeader
