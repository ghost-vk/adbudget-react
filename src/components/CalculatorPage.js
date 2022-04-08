import React from 'react'
import to from 'await-to-js'
import { withTranslation } from 'react-i18next'

import LanguageSelect from './LanguageSelect'
import Card from './Card'
import Input from './Input'
import ResultRow from './ResultRow'
import schema from '../validation-schema'
import languages from '../languages'
import { toPercent } from '../filters'

class CalculatorPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentLanguage: 'ru',
      lastModified: '',
      formError: '',
      averagePurchase: '',
      needSales: '',
      needProfit: '',
      haveVisitors: '',
      haveOrders: '',
      haveProfit: '',
      transitionCost: '',
      haveSales: '',
      averagePurchaseError: '',
      needSalesError: '',
      needProfitError: '',
      haveVisitorsError: '',
      haveOrdersError: '',
      haveProfitError: '',
      transitionCostError: '',
      haveSalesError: '',
      leadConversion: '',
      saleConversion: '',
      needLeads: '',
      needVisitors: '',
      budget: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleAveragePurchaseInput = this.handleAveragePurchaseInput.bind(this)
    this.handleNeedOrdersInput = this.handleNeedOrdersInput.bind(this)
    this.handleNeedProfitInput = this.handleNeedProfitInput.bind(this)
    this.handleHaveVisitorsInput = this.handleHaveVisitorsInput.bind(this)
    this.handleHaveOrdersInput = this.handleHaveOrdersInput.bind(this)
    this.handleHaveProfitInput = this.handleHaveProfitInput.bind(this)
    this.handleTransitionCostInput = this.handleTransitionCostInput.bind(this)
    this.handleHaveSalesInput = this.handleHaveSalesInput.bind(this)
    this.handleLastModifiedField = this.handleLastModifiedField.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleInputChange(value, fieldName) {
    value = value.replace(/,/g, '.')

    this.setState({
      lastModified: fieldName,
      [fieldName]: value,
    })
  }

  async handleLastModifiedField() {
    try {
      const isValid = await this.validateLastModifiedField()

      if (!isValid) return

      switch (this.state.lastModified) {
        case 'averagePurchase': {
          if (this.state.needSales) return this.calcNeedProfit()
          else if (this.state.needProfit) return this.calcNeedSales()

          if (this.state.haveSales) return this.calcHaveProfit()
          else if (this.state.haveProfit) return this.calcHaveSales()

          return
        }

        case 'needSales':
          return this.calcNeedProfit()

        case 'needProfit':
          return this.calcNeedSales()

        case 'haveSales':
          return this.calcHaveProfit()

        case 'haveProfit':
          return this.calcHaveSales()
      }
    } catch (e) {
      console.log(`Error when validate field ${this.state.lastModified}`)
    }
  }

  calcNeedSales() {
    if (!this.state.needProfit || !this.state.averagePurchase) return

    this.setState({
      needSales: Math.round(this.state.needProfit / this.state.averagePurchase),
      needSalesError: '',
    })
  }

  calcNeedProfit() {
    if (!this.state.needSales || !this.state.averagePurchase) return

    this.setState({
      needProfit: this.state.needSales * this.state.averagePurchase,
      needProfitError: '',
    })
  }

  calcHaveProfit() {
    if (!this.state.haveSales || !this.state.averagePurchase) return

    this.setState({
      haveProfit: this.state.haveSales * this.state.averagePurchase,
      haveProfitError: '',
    })
  }

  calcHaveSales() {
    if (!this.state.haveProfit || !this.state.averagePurchase) return

    this.setState({
      haveSales: parseInt(this.state.haveProfit / this.state.averagePurchase),
      haveSalesError: '',
    })
  }

  async validateLastModifiedField() {
    try {
      await schema.validateAt(this.state.lastModified, this.state)

      if (this.state[this.state.lastModified]) {
        this.setState({ [`${this.state.lastModified}Error`]: '' })
      }

      return true
    } catch (e) {
      if (e.name !== 'ValidationError') return false

      this.setState({
        [`${this.state.lastModified}Error`]: e.errors[0],
      })

      return false
    }
  }

  isFormEmpty() {
    const state = this.state

    return !(
      state.averagePurchase &&
      (state.needSales || state.needProfit) &&
      state.haveVisitors &&
      state.haveOrders &&
      (state.haveSales || state.haveProfit) &&
      state.transitionCost
    )
  }

  async isFormValid() {
    try {
      await schema.validate(
        {
          averagePurchase: this.state.averagePurchase,
          needSales: this.state.needSales,
          needProfit: this.state.needProfit,
          haveVisitors: this.state.haveVisitors,
          haveOrders: this.state.haveOrders,
          haveSales: this.state.haveSales,
          haveProfit: this.state.haveProfit,
          transitionCost: this.state.transitionCost,
        },
        { abortEarly: false }
      )

      return true
    } catch (e) {
      if (e.name !== 'ValidationError') return false

      if (e.inner.length > 0) {
        e.inner.forEach((err) => {
          const errorText = err.errors[0]

          if (errorText) {
            this.setState({
              [`${err.params.path}Error`]: errorText,
            })
          }
        })
      }

      return false
    }
  }

  async handleSubmit(e) {
    e.preventDefault()

    if (this.isFormEmpty()) {
      const formError =
        this.props.i18n?.language === 'ru'
          ? 'Заполните необходимые поля для расчета формы'
          : 'Fill required form fields'
      return this.setState({ formError })
    }

    const [validErr, isValid] = await to(this.isFormValid())

    if (!isValid) {
      console.log(validErr)
      const formError =
        this.props.i18n?.language === 'ru'
          ? 'Проверьте все ли поля формы правильно заполнены'
          : 'Check all required fields is filled'
      return this.setState({ formError })
    }

    const leadConversion =
      Math.floor((this.state.haveOrders / this.state.haveVisitors) * 10000) /
      10000

    this.setState({ leadConversion })

    const saleConversion =
      Math.floor((this.state.haveSales / this.state.haveOrders) * 10000) / 10000
    this.setState({ saleConversion })

    const needLeads = Math.round(this.state.needSales / saleConversion)
    this.setState({ needLeads })

    const needVisitors = Math.round(needLeads / leadConversion)
    this.setState({ needVisitors })

    const budget = Math.round(this.state.transitionCost * needVisitors, 2)
    this.setState({ budget: budget.toLocaleString() })

    this.setState({ formError: '' })
  }

  handleReset() {
    this.setState({
      averagePurchase: '',
      needSales: '',
      needProfit: '',
      haveVisitors: '',
      haveOrders: '',
      haveProfit: '',
      transitionCost: '',
      haveSales: '',
      averagePurchaseError: '',
      needSalesError: '',
      needProfitError: '',
      haveVisitorsError: '',
      haveOrdersError: '',
      haveProfitError: '',
      transitionCostError: '',
      haveSalesError: '',
    })
  }

  handleAveragePurchaseInput(e) {
    this.handleInputChange(e.target.value, 'averagePurchase')
  }

  handleNeedOrdersInput(e) {
    this.handleInputChange(e.target.value, 'needSales')
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

  handleHaveSalesInput(e) {
    this.handleInputChange(e.target.value, 'haveSales')
  }

  hasResults() {
    return !!(
      this.state.leadConversion ||
      this.state.saleConversion ||
      this.state.needLeads ||
      this.state.needVisitors ||
      this.state.budget
    )
  }

  render() {
    const { t, i18n } = this.props

    return (
      <div className="min-h-screen">
        <div className="container max-w-[1000px] px-2 mx-auto pt-3 md:pt-10 relative pb-10">
          <div className="w-fit mb-8 xs:mb-16 pr-24">
            <h1 className="text-lg xs:text-xl md:text-2xl md:text-4xl uppercase font-semibold mb-2">
              {t('main.title')}
            </h1>
          </div>

          <div className="z-20 absolute top-5 right-2">
            <LanguageSelect
              current={i18n.language}
              onChange={i18n.changeLanguage}
              languages={languages}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="card-wrapper">
              <Card title={t('main.form.title')}>
                <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
                  <Input
                    value={this.state.averagePurchase}
                    error={this.state.averagePurchaseError}
                    onChange={this.handleAveragePurchaseInput}
                    onBlur={this.handleLastModifiedField}
                    label={t('main.form.averageSale')}
                  />
                  <div className="grid grid-cols-1 xs:grid-cols-2 xs:gap-x-2">
                    <Input
                      value={this.state.needSales}
                      error={this.state.needSalesError}
                      onChange={this.handleNeedOrdersInput}
                      onBlur={this.handleLastModifiedField}
                      label={t('main.form.needSales')}
                    />
                    <Input
                      value={this.state.needProfit}
                      error={this.state.needProfitError}
                      onChange={this.handleNeedProfitInput}
                      onBlur={this.handleLastModifiedField}
                      label={t('main.form.needProfit')}
                    />
                  </div>
                  <Input
                    value={this.state.haveVisitors}
                    error={this.state.haveVisitorsError}
                    onChange={this.handleHaveVisitorsInput}
                    onBlur={this.handleLastModifiedField}
                    label={t('main.form.haveVisitors')}
                    hint={t('main.form.haveVisitorsHint')}
                  />
                  <Input
                    value={this.state.haveOrders}
                    error={this.state.haveOrdersError}
                    onChange={this.handleHaveOrdersInput}
                    onBlur={this.handleLastModifiedField}
                    label={t('main.form.haveLeads')}
                    hint={t('main.form.haveLeadsHint')}
                  />
                  <div className="grid grid-cols-1 xs:grid-cols-2 xs:gap-x-2">
                    <Input
                      value={this.state.haveSales}
                      error={this.state.haveSalesError}
                      onChange={this.handleHaveSalesInput}
                      onBlur={this.handleLastModifiedField}
                      label={t('main.form.haveSales')}
                    />
                    <Input
                      value={this.state.haveProfit}
                      error={this.state.haveProfitError}
                      onChange={this.handleHaveProfitInput}
                      onBlur={this.handleLastModifiedField}
                      label={t('main.form.haveProfit')}
                    />
                  </div>
                  <Input
                    value={this.state.transitionCost}
                    error={this.state.transitionCostError}
                    onChange={this.handleTransitionCostInput}
                    onBlur={this.handleLastModifiedField}
                    label={t('main.form.transitionCost')}
                    hint={t('main.form.transitionCostHint')}
                  />

                  {this.state.formError && (
                    <div className="border border-red-400 bg-red-50 text-red-400 p-2 rounded mb-3">
                      {this.state.formError}
                    </div>
                  )}

                  <div className="flex gap-x-2 justify-between">
                    <button
                      className="w-1/2 bg-gray-100 hover:bg-gray-300 transition-colors py-2 rounded-lg"
                      type="reset"
                    >
                      {t('common.form.reset')}
                    </button>
                    <button
                      className="w-1/2 bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded-lg text-white"
                      type="submit"
                    >
                      {t('common.form.submit')}
                    </button>
                  </div>
                </form>
              </Card>
            </div>

            <div className="card-wrapper">
              <Card title={t('main.results.title')} hidden={!this.hasResults()}>
                <div>
                  <ResultRow
                    title={t('main.results.leadConversion')}
                    value={toPercent(this.state.leadConversion)}
                  />
                  <ResultRow
                    title={t('main.results.orderConversion')}
                    value={toPercent(this.state.saleConversion)}
                  />
                  <ResultRow
                    title={t('main.results.needLeads')}
                    value={this.state.needLeads}
                  />
                  <ResultRow
                    title={t('main.results.needVisitors')}
                    value={this.state.needVisitors}
                  />
                  <ResultRow
                    title={t('main.results.needBudget')}
                    value={this.state.budget}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation('common')(CalculatorPage)
