import { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import axios from 'axios'
import AlertBanner from '../common/AlertBanner'
import ScoopOption from './ScoopOption'
import ToppingOption from './ToppingOption'
import { pricePerItem } from '../../constants'
import { useOrderDetails } from '../../contexts/OrderDetails'
import { formatCurrency } from '../../utilities'

const Options = ({ optionType }) => {
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)

  const [orderDetails, updateItemCount] = useOrderDetails()

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => setError(true))
  }, [optionType])

  if (error) {
    return <AlertBanner />
  }

  // ItemComponent is either ScoopOption or TopingOption depending on route (optionType)
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption

  // Make a first letter capitalize/uppercase and rest of the string to lowercase
  // .slice(1) - take it from index 1 (second) till the end
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ))

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  )
}

export default Options
