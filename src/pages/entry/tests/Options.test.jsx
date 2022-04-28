// import { render, screen } from '@testing-library/react'
import { render, screen } from '../../../test-utils/testing-library-utils'
import Options from '../Options'

test('should display image for each scoop from server', async () => {
  render(<Options optionType='scoops' />)

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
  expect(scoopImages).toHaveLength(2)

  // confirm alt text of images
  // 'ignorisi' gresku za 'element.alt' ukoliko se pojavi
  const altText = scoopImages.map((element) => element.alt)
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})

test('should display image for every topping from server', async () => {
  render(<Options optionType='toppings' />)

  // find images
  const toppingImages = await screen.findAllByRole('img', { name: /topping$/i })
  expect(toppingImages).toHaveLength(3)

  // confirm alt text
  const altText = toppingImages.map((element) => element.alt)
  expect(altText).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping'
  ])
})
