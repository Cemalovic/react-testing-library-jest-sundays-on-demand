import axios from 'axios'
import { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import ScoopOption from './ScoopOption'

const Options = ({ optionType }) => {
  const [items, setItems] = useState([])

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        // TODO: handle error response
      })
  }, [optionType])

  // TODO: replace 'null' with TopingOption when available
  const ItemComponent = optionType === 'scoops' ? ScoopOption : null

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ))

  return <Row>{optionItems}</Row>
}

export default Options
