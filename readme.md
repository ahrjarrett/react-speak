# react-speak

Simple, extensible React HOC for interop with the [Web SpeechRecognition](https://w3c.github.io/speech-api/speechapi.html) API.

[Visit react-speak on npm](https://www.npmjs.com/package/react-speak).


## Dependencies:
- [React 16](https://github.com/facebook/react)
- [PropTypes](https://github.com/facebook/prop-types)


## Install

Do:

```$ npm install react-speak```

or:

```$ yarn add react-speak```


## Simple Usage

Using `react-speak` is pretty simple because it's designed to do one thing well: allow your React/Redux components to work with your browser's native Web SpeechRecognition API and give you access to a user's microphone.

Under the hood, `withSpeech` is a function that takes a component and returns a wrapped component with the following PropTypes:

``` jsx
WithSpeech.propTypes = {
  startListening: PropTypes.func.isRequired,
  stopListening: PropTypes.func.isRequired,
  addToRegister: PropTypes.func,
}
```

The package was written to be used with Redux, so all three props were designed to be action creators that return action objects (see the Redux section below).


## Example Setup

Here's a simple setup using Redux:

``` jsx
import withSpeech from 'react-speak'
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

const YourComponentWithSpeech = props => (
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
)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSpeech,
)(YourComponentWithSpeech)
```


## Redux:

`withSpeech` returns a component with the following props: 

* `startListening` (function, required)
* `stopListening` (function, required)
* `addToRegister` (function)

All three are action creators that return action objects.

`startListening` and `stopListening` are similar in that they 
don't receive any particular payload from the withSpeech
component; your action creator could be as simple as:

``` js
const startListening = () => ({ type: INIT_LISTEN })
```

`addToRegister` on the other hand receives a transcript or "register", 
which is just an array of strings from your user's microphone. You can pass 
this as a payload to your reducers and do whatever you want with next.

An example action creator:

``` js
const sendToAlexa = transcript => ({
  type: TRANSCRIPT_SENT,
  payload: transcript
})
```


## FAQ:

* _Q:_ Do I have to use Redux?
* _A:_ Currently this only officially supports a Redux or Flux-type model where you have reducers that listen for the actions that withSpeech returns, and manages the logic for how this component actually mutates state.
 
* _Q:_ How can I contribute?
* _A:_ Contributions are totally welcome! See the section on contributing below.


## Contributing

PRs that abstract this component's functionality to React in general are absolutely welcome! Also, drop me a line if you're interested in helping me work with the [SpeechSynthesis](https://w3c.github.io/speech-api/speechapi.html#tts-section) interface, as currently `withSpeech` only implements the [SpeechRecognition](https://w3c.github.io/speech-api/speechapi.html#speechreco-section) protocol.
