import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useOrderDetails } from '../../contexts/OrderDetails'

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails()
  const [orderNumber, setOrderNumber] = useState(null)

  useEffect(() => {
    // in real app we would get order details from context and send with POST
    axios
      .post('http://localhost:3030/order')
      .then((response) => {
        setOrderNumber(response.data.orderNumber)
      })
      .catch((error) => {
        // TODO: handle error
      })
  }, [])

  const handleClick = () => {
    // clear the order details
    resetOrder()

    // send back to order page
    setOrderPhase('inProgress')
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: '25%' }}>
          as per our terms and contitions, nothing will happen now
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    )
  } else {
    return <div>Loading</div>
  }
}

export default OrderConfirmation
