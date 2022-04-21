import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const SummaryForm = () => {
  const [checked, setChecked] = useState(false)

  const onCheckbox = (e) => {
    setChecked(e.target.checked)
  }

  const checkboxLabel = (
    <span>
      I agree to <span style={{ color: 'blue' }}>Terms and conditions</span>
    </span>
  )

  return (
    <Form>
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
