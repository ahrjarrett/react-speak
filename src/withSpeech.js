import React, { Component } from 'react'
import propTypes from 'prop-types'

const head = arr => arr[0]

const withSpeech = Comp => {
  class WithSpeech extends Component {
    componentDidMount = () => {
      // Standardize DOM event across Chrome, Safari & Firefox:
      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

      this.recognition = new window.SpeechRecognition()
      this.recognition.interimResults = true
    }

    componentWillUnmount = () => {
      this.recognition.removeEventListener('result', this.accumulateTranscript)
    }

    start = () => {
      this.props.startListening()
      this.recognition.addEventListener('result', this.accumulateTranscript)
      this.recognition.start()
    }

    stop = () => {
      this.props.stopListening()
      this.recognition.stop()
    }

    accumulateTranscript = e => {
      const transcript = Array.from(e.results)
        .map(head)
        .map(({ transcript }) => transcript)
        .join('')

      if (head(e.results).isFinal)
        this.props.addToRegister(transcript)
    }

    render() {
      return (
	<Comp
          {...this.props}
          startListening={this.start}
          stopListening={this.stop}
	/>
      )
    }
  }

  WithSpeech.propTypes = {
    startListening: propTypes.func.isRequired,
    stopListening: propTypes.func.isRequired,
    addToRegister: propTypes.func,
  }

  return WithSpeech
}

export default withSpeech

