import React from 'react'

import LanguageSelect from './LanguageSelect'
import Card from './Card'
import Input from './Input'
import Select from './Select'
import ResultRow from './ResultRow'
import schema from '../validation-schema'
import languages from '../languages'
import currencyList from '../currency'

class CalculatorPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentLanguage: 'ru',
      currency: 'usd',
      lastModified: '',
      values: {
        averagePurchase: '',
        needOrders: '',
        needProfit: '',
        haveVisitors: '',
        haveOrders: '',
        haveProfit: '',
        transitionCost: '',
      },
      errors: {
        averagePurchase: '',
        needOrders: '',
        needProfit: '',
        haveVisitors: '',
        haveOrders: '',
        haveProfit: '',
        transitionCost: '',
      },
      results: {},
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleAveragePurchaseInput = this.handleAveragePurchaseInput.bind(this)
    this.handleNeedOrdersInput = this.handleNeedOrdersInput.bind(this)
    this.handleNeedProfitInput = this.handleNeedProfitInput.bind(this)
    this.handleHaveVisitorsInput = this.handleHaveVisitorsInput.bind(this)
    this.handleHaveOrdersInput = this.handleHaveOrdersInput.bind(this)
    this.handleHaveProfitInput = this.handleHaveProfitInput.bind(this)
    this.handleTransitionCostInput = this.handleTransitionCostInput.bind(this)
    this.validateField = this.validateField.bind(this)
  }

  handleInputChange(value, fieldName) {
    const newState = JSON.parse(JSON.stringify(this.state))
    newState.values[fieldName] = value
    newState.lastModified = fieldName
    this.setState(newState)
  }

  async validateField() {
    try {
      await schema.validateAt(this.state.lastModified, this.state.values)

      if (this.state.errors[this.state.lastModified]) {
        const newState = JSON.parse(JSON.stringify(this.state))
        newState.errors[this.state.lastModified] = ''
        this.setState(newState)
      }
    } catch (e) {
      if (e.name !== 'ValidationError') return

      const newState = JSON.parse(JSON.stringify(this.state))
      newState.errors[this.state.lastModified] = e.errors.join(' ')
      this.setState(newState)
    }
  }

  hasError(control) {
    return !!this.state.errors[control]
  }

  handleAveragePurchaseInput(e) {
    this.handleInputChange(e.target.value, 'averagePurchase')

    if (!this.state.needOrders || this.hasError('needOrders')) {
      return
    }
  }

  handleNeedOrdersInput(e) {
    this.handleInputChange(e.target.value, 'needOrders')
  }

  handleNeedProfitInput(e) {
    this.handleInputChange(e.target.value, 'needProfit')
  }

  handleHaveVisitorsInput(e) {
    this.handleInputChange(e.target.value, 'haveVisitors')
  }

  handleHaveOrdersInput(e) {
    this.handleInputChange(e.target.value, 'haveOrders')
  }

  handleHaveProfitInput(e) {
    this.handleInputChange(e.target.value, 'haveProfit')
  }

  handleTransitionCostInput(e) {
    this.handleInputChange(e.target.value, 'transitionCost')
  }

  render() {
    return (
      <div className="min-h-screen">
        <div className="container px-2 mx-auto pt-10 relative">
          <div className="w-fit mb-16">
            <h1 className="text-2xl md:text-4xl uppercase font-semibold mb-2">
              Калькулятор рекламного бюджета & Формула
            </h1>
            <div className="w-full h-1.5 bg-blue-700 rounded-lg" />
          </div>

          <div className="absolute top-5 right-0">
            <LanguageSelect
              current={this.state.currentLanguage}
              languages={languages}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="card-wrapper">
              <Card
                title="Калькулятор рекламного бюджета"
                content={
                  <div>
                    <Select
                      hint="Выберите валюту"
                      value={this.state.currency}
                      options={currencyList}
                    />
                    <Input
                      value={this.state.values.averagePurchase}
                      error={this.state.errors.averagePurchase}
                      onChange={this.handleAveragePurchaseInput}
                      onBlur={this.validateField}
                      label="Цена заявки (средний чек)"
                      hint="Подсказка для ввода"
                    />
                    <div className="flex gap-x-2">
                      <Input
                        value={this.state.values.needOrders}
                        error={this.state.errors.needOrders}
                        onChange={this.handleNeedOrdersInput}
                        onBlur={this.validateField}
                        label="Нужно заявок"
                      />
                      <Input
                        value={this.state.values.needProfit}
                        error={this.state.errors.needProfit}
                        onChange={this.handleNeedProfitInput}
                        onBlur={this.validateField}
                        label="Нужно прибыли"
                      />
                    </div>
                    <Input
                      value={this.state.values.haveVisitors}
                      error={this.state.errors.haveVisitors}
                      onChange={this.handleHaveVisitorsInput}
                      onBlur={this.validateField}
                      label="Посетителей в месяц"
                    />
                    <div className="flex gap-x-2">
                      <Input
                        value={this.state.values.haveOrders}
                        error={this.state.errors.haveOrders}
                        onChange={this.handleHaveOrdersInput}
                        onBlur={this.validateField}
                        label="Заявок в месяц"
                      />
                      <Input
                        value={this.state.values.haveProfit}
                        error={this.state.errors.haveProfit}
                        onChange={this.handleHaveProfitInput}
                        onBlur={this.validateField}
                        label="Прибыли в месяц"
                      />
                    </div>
                    <Input
                      value={this.state.values.transitionCost}
                      error={this.state.errors.transitionCost}
                      onChange={this.handleTransitionCostInput}
                      onBlur={this.validateField}
                      label="Стоимость перехода по рекламе"
                      hint="Можно узнать исходя из рекламных тестов или из опыта конкурентов"
                    />
                  </div>
                }
              />
            </div>

            <div className="card-wrapper">
              <Card
                title="Результаты"
                content={
                  <div>
                    <ResultRow title="Конверсия в заявку" value="10%" />
                    <ResultRow title="Конверсия в заказ" value="10%" />
                    <ResultRow title="Необходимо лидов" value="100" />
                    <ResultRow title="Необходимо посетителей" value="1000" />
                    <ResultRow
                      title="Рекомендуемый бюджет"
                      value="100 000 руб."
                    />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CalculatorPage
