import * as yup from 'yup'

const em = {
  required: 'Необходимое поле для заполнения.',
  number: 'Необходимо числовое значение.',
  positive: 'Число должно быть положительным',
  integer: 'Значение должно быть целочисленным',
}

const positiveFloat = yup
  .number(em.number)
  .typeError(em.number)
  .required(em.required)
  .positive(em.positive)

const positiveInteger = yup
  .number(em.number)
  .typeError(em.number)
  .required(em.required)
  .positive(em.positive)
  .integer(em.integer)

const schema = yup.object().shape({
  averagePurchase: positiveFloat,
  needOrders: positiveInteger,
  needProfit: positiveFloat,
  haveVisitors: positiveInteger,
  haveOrders: positiveInteger,
  haveProfit: positiveFloat,
  transitionCost: positiveFloat,
})

export default schema
