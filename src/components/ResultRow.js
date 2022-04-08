import React from 'react'

export default class ResultRow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (!this.props.value) return null

    return (
      <div>
        <div className="flex items-center justify-between h-12">
          <div className="font-semibold">{this.props.title}</div>
          <div>{this.props.value}</div>
        </div>
      </div>
    )
  }
}
