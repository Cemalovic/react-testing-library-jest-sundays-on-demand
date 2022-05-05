import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

test('should order phases for happy path', async () => {
  // render App
  render(<App />)

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla'
  })
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate'
  })
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries'
  })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1')
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')
  userEvent.click(cherriesCheckbox)

  // find and click 'Order' button
  const orderButton = screen.getByRole('button', { name: /order sundae/i })
  userEvent.click(orderButton)

  // check summary information based on the order
  const summaryHeading = screen.getByRole('heading', { name: /order summary/i })
  expect(summaryHeading).toBeInTheDocument()

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' })
  expect(scoopsHeading).toBeInTheDocument()

  const toppingsHeading = screen.getByRole('heading', {
    name: 'Toppings: $1.50'
  })
  expect(toppingsHeading).toBeInTheDocument()

  // check summary option items
  expect(screen.getByText(/1 vanilla/i)).toBeInTheDocument()
  expect(screen.getByText(/2 chocolate/i)).toBeInTheDocument()
  expect(screen.getByText(/cherries/i)).toBeInTheDocument()

  // ili moze i ovako
  // const optionItems = screen.getAllByRole('listitem')
  // const optionItemsText = optionItems.map((item) => item.textContent)
  // expect(optionItemsText).toEqual(['1 Vanilla', '2 Chocolate', 'Cherries1'])

  // accept 'terms and conditions' and click button to confirm order
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i
  })
  const confirmOrderButton = screen.getByRole('button', {
    name: /confirm order/i
  })
  userEvent.click(checkbox)
  userEvent.click(confirmOrderButton)

  // expect 'loading' to show
  const loading = screen.getByText(/loading/i)
  expect(loading).toBeInTheDocument()

  // confirm order number on confirmation page
  // this is async because of POST request to server between summary and confirmation page
  const thankYouHeading = await screen.findByRole('heading', {
    name: /thank you/i
  })
  const orderNumber = await screen.findByText(/order number/i)
  expect(thankYouHeading).toBeInTheDocument()
  expect(orderNumber).toBeInTheDocument()

  // expect 'loading' has disappeared
  const notLoading = screen.queryByText(/loading/i)
  expect(notLoading).not.toBeInTheDocument()

  // click 'new order' button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: /new order/i })
  userEvent.click(newOrderButton)

  // check that scoops and topping subtotal have been reset
  const scoopsTotal = screen.getByText('Scoops total: $0.00')
  const toppingsTotal = screen.getByText('Toppings total: $0.00')
  expect(scoopsTotal).toBeInTheDocument()
  expect(toppingsTotal).toBeInTheDocument()

  // wait for items to appear so that Testing Library knows what's happening after test is over
  await screen.findByRole('spinbutton', { name: 'Vanilla' })
  await screen.findByRole('checkbox', { name: 'Cherries' })
})

test('Toppings header is not on summary page if no toppings ordered', async () => {
  render(<App />)

  // add ice cream scoops
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla'
  })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '2')

  // find and click 'Order' button
  const orderButton = screen.getByRole('button', { name: /order sundae/i })
  userEvent.click(orderButton)

  // check summary information based on the order
  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $4.00' })
  const toppingsHeading = screen.queryByRole('heading', { name: /toppings/i })
  expect(scoopsHeading).toBeInTheDocument()
  expect(toppingsHeading).not.toBeInTheDocument()
})
