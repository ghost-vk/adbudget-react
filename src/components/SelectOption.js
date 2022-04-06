import React from 'react'

export default class SelectOption extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div
        className={`p-2 pl-4 h-12 text-gray-600 w-full flex
          items-center transition-colors border-b border-gray-200 hover:bg-gray-200
          ${
            this.props.selected
              ? 'bg-gray-200 cursor-default'
              : 'bg-gray-50 cursor-pointer'
          } 
        `}
      >
        {this.props.title}
      </div>
    )
  }
}
