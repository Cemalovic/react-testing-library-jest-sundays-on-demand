// import { render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import {
  render,
  screen,
  waitFor
} from '../../../test-utils/testing-library-utils'
import { server } from '../../../mocks/server'
import OrderEntry from '../OrderEntry'
import userEvent from '@testing-library/user-event'

test('should handle error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  )

  render(<OrderEntry setOrderPhase={jest.fn()} />)

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert')
    expect(alerts).toHaveLength(2)
  })
})

test('should disable Order button if scoops are not added', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />)

  // find 'Order' button and check if it's disabled
  const orderButton = screen.getByRole('button', { name: /order sundae/i })
  expect(orderButton).toBeDisabled()

  // add ice cream scoops and check if 'Order' button is enabled
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i
  })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '2')
  expect(orderButton).toBeEnabled()

  // remove ice cream scoops and check if 'Order' button is disabled
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '0')
  expect(orderButton).toBeDisabled()
})
