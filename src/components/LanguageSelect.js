import React from 'react'

class LanguageSelect extends React.Component {
  constructor(props) {
    super(props)

    this.componentContainer = React.createRef()

    this.state = {
      opened: false,
    }

    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this)
  }

  onItemClick(lang) {
    console.log('click: ', lang)
  }

  toggle() {
    this.setState((prevState) => ({
      opened: !prevState.opened,
    }))
  }

  onClickOutsideHandler(e) {
    if (
      this.state.opened &&
      !this.componentContainer.current.contains(e.target)
    ) {
      this.setState(() => ({ opened: false }))
    }
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler)
  }

  render() {
    const currentLanguage = this.props.languages.find(
      (l) => l.value === this.props.current
    )

    const languages = this.props.languages.map((l) => (
      <div
        key={l.value}
        className={`p-2 hover:bg-gray-200 transition-colors 
          ${
            currentLanguage.value === l.value
              ? 'bg-gray-200 cursor-default'
              : 'bg-gray-100 cursor-pointer'
          }
        `}
        onClick={this.onItemClick.bind(this, l.value)}
      >
        {l.title}
      </div>
    ))

    return (
      <div ref={this.componentContainer} className="w-36">
        <div
          className={`border border-blue-200 pl-2 bg-blue-100
            ${this.state.opened ? 'rounded-t-lg' : 'rounded-lg'}
          `}
        >
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={this.toggle.bind(this)}
          >
            <div>{currentLanguage.title}</div>
            <div
              className={`p-2 transform transition-transform ${
                this.state.opened ? 'rotate-180' : ''
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-blue-700"
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
          </div>
        </div>
        {this.state.opened && (
          <div>
            <div className="h-40">
              <div className="max-h-max rounded-b-lg border-b border-l border-r border-gray-300 overflow-auto">
                {languages}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default LanguageSelect
