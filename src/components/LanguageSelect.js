import React from 'react'

class LanguageSelect extends React.Component {
  render() {
    return (
      <div ref={this.componentContainer} className="w-20">
        <div className="border border-blue-200 bg-blue-100 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between cursor-pointer text-2xl cursor-pointer">
            <div
              className={`w-1/2 text-center border-r border-blue-200 transition-colors
                ${this.props.current === 'ru' ? 'bg-blue-600' : ''}
              `}
              onClick={() => this.props.onChange('ru')}
            >
              🇷🇺
            </div>
            <div
              className={`w-1/2 text-center transition-colors
                ${this.props.current === 'en' ? 'bg-blue-600' : ''}
              `}
              onClick={() => this.props.onChange('en')}
            >
              🇺🇸
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LanguageSelect
