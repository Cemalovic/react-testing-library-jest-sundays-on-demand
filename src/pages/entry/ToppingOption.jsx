import { Col } from 'react-bootstrap'

const ToppingOption = ({ name, imagePath }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
        style={{ textAlign: 'center' }}
      />
    </Col>
  )
}

export default ToppingOption
