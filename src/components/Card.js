import React from 'react'

export default class Card extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="shadow-lg rounded-xl">
        <div className="p-3 bg-blue-700 text-white text-xl rounded-t-xl">
          {this.props.title}
        </div>
        <div className="p-3 bg-white rounded-b-xl">{this.props.content}</div>
      </div>
    )
  }
}
