// import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../../../test-utils/testing-library-utils'
import Options from '../Options'
import OrderEntry from '../OrderEntry'

test('should update scoop subtotal when scoops change', async () => {
  render(<Options optionType='scoops' />)

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
  // drugin nacin da se napise isto ovo iznad:
  // const scoopsSubtotal = screen.getByText(/scoops total: \$/i)
  expect(scoopsSubtotal).toHaveTextContent('0.00')

  // update Vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla'
  })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1')
  expect(scoopsSubtotal).toHaveTextContent('2.00')

  // update Chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate'
  })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')
  expect(scoopsSubtotal).toHaveTextContent('6.00')
})

test('should update topping subtotal when toppings change', async () => {
  render(<Options optionType='toppings' />)

  // make sure total starts out $0.00
  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false
  })
  expect(toppingsSubtotal).toHaveTextContent('0.00')

  // add Cherries topping and check subtotal
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries'
  })
  expect(cherriesCheckbox).not.toBeChecked()

  userEvent.click(cherriesCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('1.50')

  // add M&Ms topping and check subtotal
  const mAndMsCheckbox = await screen.findByRole('checkbox', {
    name: 'M&Ms'
  })
  expect(mAndMsCheckbox).not.toBeChecked()

  userEvent.click(mAndMsCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('3.00')

  expect(cherriesCheckbox).toBeChecked()

  userEvent.click(cherriesCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('1.50')

  expect(cherriesCheckbox).not.toBeChecked()
})

describe('grand total', () => {
  test('should grand total update if scoop is added first', async () => {
    render(<OrderEntry />)

    // grand total start at $0.00
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i })
    expect(grandTotal).toHaveTextContent('0.00')

    // add Vanilla scoop to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla'
    })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '2')
    expect(grandTotal).toHaveTextContent('4.00')

    // add Cherries topping and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries'
    })
    userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('5.50')
  })

  test('should grand total update if topping is added first', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i })

    // add Cherries topping and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries'
    })
    userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('1.50')

    // add Vanilla scoop to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla'
    })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '2')
    expect(grandTotal).toHaveTextContent('5.50')
  })

  test('should grand total update if item is removed', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i })

    // add Cherries topping and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries'
    })
    userEvent.click(cherriesCheckbox)
    // Grand Total = $1.50

    // add Vanilla scoop to 2
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla'
    })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '2')
    // Grand Total = $5.50

    // remove 1 scoop of Vanilla and check grand total
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1')

    expect(grandTotal).toHaveTextContent('3.50')

    // remove Cherries topping and check grand total
    userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('2.00')
  })
})
