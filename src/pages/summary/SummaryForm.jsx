import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

const SummaryForm = ({ setOrderPhase }) => {
  const [checked, setChecked] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    // pass along to the next phase
    // The next page will handle submitting order from context
    setOrderPhase('completed')
  }

  const onCheckbox = (e) => {
    setChecked(e.target.checked)
  }

  const popover = (
    <Popover id='popover-basic'>
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  )

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement='right' overlay={popover}>
        <span style={{ color: 'blue' }}>Terms and conditions</span>
      </OverlayTrigger>
    </span>
  )

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='terms-and-conditions'>
        <Form.Check
          type='checkbox'
          checked={checked}
          label={checkboxLabel}
          onChange={onCheckbox}
        />

        <Button variant='primary' type='submit' disabled={!checked}>
          Confirm order
        </Button>
      </Form.Group>
    </Form>
  )
}

export default SummaryForm
