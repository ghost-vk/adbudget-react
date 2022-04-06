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
    return (
      <div className="mb-3 w-full">
        <div
          className={`h-12 p-2 border-gray-200 rounded relative transition-colors cursor-text
            ${this.props.error ? 'border-2 border-red-600' : ''}
            ${
              this.state.focused
                ? 'border-2 border-blue-600'
                : 'border border-gray-200'
            }
          `}
          onClick={this.onClickContainer}
        >
          <span
            className={`absolute left-3 transform transition-all top-1/2 pointer-events-none px-1
              ${this.props.error ? 'text-red-600' : ''}
              ${this.state.focused ? 'text-blue-600' : 'text-gray-400'}
              ${
                this.state.focused || this.props.value
                  ? 'text-xs -translate-y-8 bg-white'
                  : 'text-base -translate-y-1/2 bg-transparent'
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
