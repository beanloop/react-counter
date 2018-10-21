# react-counter

>

[![NPM](https://img.shields.io/npm/v/react-counter.svg)](https://www.npmjs.com/package/react-counter) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @beanloop-ab/react-counter
```

## Usage

```tsx
import * as React from 'react'

import {Counter} from 'react-counter'

class Example extends React.Component {
  render() {
    return (
      <div>
        <Counter from={500} to={1600} duration={2000} />
        <Counter to={1000} duration={2000} easing={n => n * n} />
        <Counter to={1000} duration={2000} easing={n => n} />
        <Counter to={1000}>
          {value => (
            <p style={{color: 'red'}}>
              {value} custom formatting with render prop
            </p>
          )}
        </Counter>
      </div>
    )
  }
}
```

## License

MIT © [Beanloop](https://github.com/beanloop-ab), [Jakob Miland](https://github.com/saebekassebil)
