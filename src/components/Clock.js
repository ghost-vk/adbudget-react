import React from 'react'

export default class Clock extends React.Component {
  constructor(props) {
    super(props)

    this.state = { date: new Date() }
  }

  tick() {
    this.setState({ date: new Date() })
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 10000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  render() {
    return (
      <div>
        <span>{this.state.date.toLocaleTimeString()}</span>
      </div>
    )
  }
}
