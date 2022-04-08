import React from 'react'

export default class Input extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      focused: false,
    }

    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onClickContainer = this.onClickContainer.bind(this)

    this.inputRef = React.createRef()
  }

  onFocus() {
    this.setState({
      focused: true,
    })
  }

  onBlur() {
    this.setState({
      focused: false,
    })

    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur()
    }
  }

  onClickContainer() {
    this.inputRef.current.focus()
  }

  render() {
    const borderColorClass = this.props.error
      ? 'border-red-600'
      : this.state.focused
      ? 'border-blue-600'
      : 'border-gray-200'

    const labelColorClass = this.props.error
      ? 'text-red-600'
      : this.state.focused
      ? 'text-blue-600'
      : 'text-gray-400'

    return (
      <div className="mb-3 w-full">
        <div
          className={`h-12 p-2 rounded relative transition-colors cursor-text
            ${borderColorClass}
            ${this.state.focused ? 'border-2' : 'border'}
          `}
          onClick={this.onClickContainer}
        >
          <span
            className={`absolute left-3 transform transition-all top-1/2 pointer-events-none px-1
              ${labelColorClass}
              ${
                this.state.focused || this.props.value
                  ? 'text-xs -translate-y-8 bg-white'
                  : 'text-sm xs:text-base -translate-y-1/2 bg-transparent'
              }
            `}
          >
            {this.props.label}
          </span>
          <input
            ref={this.inputRef}
            className="bg-transparent outline-none h-full w-full"
            value={this.props.value}
            type="text"
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.props.onChange}
          />
        </div>
        {this.props.hint && !this.props.error && (
          <div className="text-gray-400 text-xs mt-2">{this.props.hint}</div>
        )}
        {this.props.error && (
          <div className="text-red-600 text-xs mt-2">{this.props.error}</div>
        )}
      </div>
    )
  }
}
