import {Counter} from './'
import * as T from 'react-testing-library'
import * as React from 'react'

jest.useFakeTimers();

(global as any).requestAnimationFrame = function(callback: () => void) {
  setTimeout(callback, 0);
};

afterEach(T.cleanup)

describe('ExampleComponent', () => {
  it('is truthy', () => {
    expect(Counter).toBeTruthy()
  })

  it('renders the number', () => {
    const to = 1000
    const res = T.render(<Counter to={to}/>)
    jest.runAllTimers()
    expect(res.container.innerHTML).toBeTruthy()
    expect(res.container.firstChild).toBeTruthy();
    expect(res.container.firstChild && Number(res.container.firstChild.textContent)).toBe(to)
  })

  it ('renders from first', () => {
    const from = 42
    const to = 84
    const res = T.render(<Counter from={from} to={to} />)
    const node = res.container.firstChild

    expect(node && Number(node.textContent)).toBe(from)

    jest.runAllTimers()

    expect(node && Number(node.textContent)).toBe(to)
  })

  it('works with render prop', () => {
    const from = 42
    const to = 84
    const res = T.render(
      <Counter from={from} to={to}>
        {value => <div data-testid="test">{value}</div>}
      </Counter>
    )

    let actual = Number(res.getByTestId("test").innerHTML)
    expect(actual).toBeTruthy()
    expect(actual).toBe(from)

    jest.runAllTimers()

    actual = Number(res.getByTestId("test").innerHTML)
    expect(actual).toBe(to)
    
  })

  it('works with a custom easing function prop', () => {
    const from = 42
    const to = 84
    const res = T.render(
      <Counter from={from} to={to} easing={n => n}>
        {value => <div data-testid="test">{value}</div>}
      </Counter>
    )

    let actual = Number(res.getByTestId("test").innerHTML)
    expect(actual).toBeTruthy()
    expect(actual).toBe(from)

    jest.runAllTimers()

    actual = Number(res.getByTestId("test").innerHTML)
    expect(actual).toBe(to)
    
  })
})
