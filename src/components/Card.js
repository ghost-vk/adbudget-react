import React from 'react'

export default class Card extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.hidden) return null

    return (
      <div className="shadow-lg rounded-xl">
        <div className="p-3 bg-blue-700 text-white text-base xs:text-xl rounded-t-xl">
          {this.props.title}
        </div>
        <div className="p-3 bg-white rounded-b-xl">{this.props.children}</div>
      </div>
    )
  }
}
