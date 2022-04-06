import React from 'react'

import SelectOption from './SelectOption'

export default class Select extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputWidth: 0,
      optionsVisible: false,
    }

    this.inputContainer = React.createRef()

    this.onClickContainer = this.onClickContainer.bind(this)
    this.onOuterClick = this.onOuterClick.bind(this)
  }

  componentDidMount() {
    this.setState({
      inputWidth: this.inputContainer.current.clientWidth,
    })

    window.addEventListener('click', this.onOuterClick)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onOuterClick)
  }

  onClickContainer() {
    this.setState((prevState) => ({
      optionsVisible: !prevState.optionsVisible,
    }))
  }

  onOuterClick(e) {
    if (
      this.state.optionsVisible &&
      !this.inputContainer.current.contains(e.target)
    ) {
      this.setState({
        optionsVisible: false,
      })
    }
  }

  render() {
    const currentOption = this.props.options.find(
      (o) => o.value === this.props.value
    )

    const options = this.props.options.map((o) => (
      <SelectOption
        key={o.value}
        title={o.title}
        value={o.value}
        selected={currentOption.value === o.value}
      />
    ))

    return (
      <div className="mb-2">
        <div
          ref={this.inputContainer}
          className={`h-12 p-2 pl-4 rounded relative transition-colors cursor-pointer flex items-center
            ${
              this.state.optionsVisible
                ? 'border-2 border-blue-600'
                : 'border border-gray-200'
            }
          `}
          onClick={this.onClickContainer}
        >
          <span>{currentOption.title}</span>

          <div
            className={`absolute right-3 top-1/2 transform transition-transform -translate-y-1/2
            ${this.state.optionsVisible ? 'rotate-180' : ''}
          `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ${
                this.state.optionsVisible ? 'text-blue-600' : 'text-gray-400'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {this.state.optionsVisible && (
            <div
              className="z-20 transition-opacity absolute top-12 left-0 shadow-lg rounded overflow-hidden"
              style={{ width: this.state.inputWidth }}
            >
              {options}
            </div>
          )}
        </div>
        {this.props.hint && (
          <div className="text-gray-400 text-xs mt-2">{this.props.hint}</div>
        )}
      </div>
    )
  }
}
