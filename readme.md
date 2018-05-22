# react-speak

Stupid-simple, extensible React HOC for interop with the [[https://w3c.github.io/speech-api/speechapi.html][Web Speech]] API.

## Dependencies:
- React 15.X
- PropTypes (looking to make optional)

## Install
To install simply run:
`$ npm install react-speak --save`

or do:

`$ yarn add react-speak`


## Simple Usage

Using `react-speak` is pretty simple. `withSpeech` is the name of the function that returns a React component with the following props:

``` jsx
<Speak 
	startListening={yourActionCreator} 
	stopListening{anotherActionCreator} 
	addToRegister={payload => someActionCreator(payload)}
	{...props}
/>
```

Here's an example setup:

``` jsx
import withSpeach from 'react-speak'
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { startListening, stopListening, addToRegister, clearRegister } from '../actions/speech'

// Whatever state you care about:
const mapStateToProps = state => ({ 
  isListening: state.isListening,
  register: state.register
})

const mapDispatchToProps = {
  startListening,
  stopListening,
  addToRegister,
  clearRegister
}

const YourComponentWithSpeech = props => ({
  <div className="ComponentWithSpeech">
    {props.isListening
      ? null 
      : (
        <button onClick={() => onSave(props.register)}>
		  Start speaking
        </button>
      )
    }
    <div className="transcript">
      {props.register.map(transcript => <div>{transcript}</div>)}
    </div>
  </div>
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSpeech,
)(YourComponentWithSpeech)
```

## Props

`withSpeech` is a function (`WithSpeech`, internally)that returns a component with the following props: 

* startListening (function, required)
* stopListening (function, required)
* addToRegister (function)

All three are action creators that return action objects.

*Function Signatures:*

```@startListening = (Action Creator :: () -> {type, ...meta}) -> Action Object (no payload)```

```@stopListening  = (Action Creator :: () -> {type, ...meta}) -> Action Object (no payload)```

```@addToRegister  = (Action Creator :: Array(String) -> {type, ...meta, payload : Array(String)}) -> Action Object (with payload)```

*Additional Notes:*

`startListening` and `stopListening` are similar in that they 
don't receive any particular payload from the withSpeech
component; the action object they return can be as simple as:

```const startListening = () => ({ type: WHAT_YOUR_REDUCERS_WILL_LISTEN_FOR })```

`addToRegister` is different in that the action creator implicitly
receives (from withSpeech) a "register", which is an array of strings
that you can assign to a `data` or `payload` property on your action.

## FAQ:

* _Q: Do I have to use Redux?_ 
* A: Currently this only officially supports a Redux or Flux-type model where you have reducers that listen for the actions that withSpeech returns, and manages the logic for how this component actually mutates state.
 
* _Q: How can I contribute?_ 
* A: PRs that abstract this component's functionality to React in general are absolutely welcome!

