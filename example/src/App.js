import React, {Component} from 'react'

import {Counter} from 'react-counter'

export default class App extends Component {
  render() {
    return (
      <div>
        Examples
        <div>
          <pre>{`<Counter from={500} to={1600} duration={2000} />`}</pre>
          <Counter from={500} to={1600} duration={2000} />
        </div>
        <div>
          <pre
          >{`<Counter to={1000} duration={2000} easing={n => n * n} />`}</pre>
          <Counter to={1000} duration={2000} easing={n => n * n} />
        </div>
        <div>
          <pre>{`<Counter to={1000} duration={2000} easing={n => n} />`}</pre>
          <Counter to={1000} duration={2000} easing={n => n} />
        </div>
        <div>
          <pre>
            {`<Counter
  to={1000}
  render={value => (
    <p style={{color: 'red'}}>
      {number} custom formatting with render prop
    </p>
  )}
/>`}
          </pre>
          <Counter to={1000}>
            {value => (
              <p style={{color: 'red'}}>
                {value} custom formatting with render prop
              </p>
            )}
          </Counter>
        </div>
      </div>
    )
  }
}
