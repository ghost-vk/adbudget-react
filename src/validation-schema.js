import * as yup from 'yup'
import i18n from './i18n'

const isEn = i18n.language === 'en'
const em = {
  required: isEn ? 'Required field' : 'Поле обязательно к заполнению',
  number: isEn ? 'Required number' : 'Необходимо числовое значение',
  positive: isEn
    ? 'Required positive number'
    : 'Число должно быть положительным',
  integer: isEn ? 'Required integer' : 'Значение должно быть целочисленным',
  max: (field) =>
    isEn
      ? `Value can't be more than ${field.max}`
      : `Значение не может быть больше ${field.max}`,
  min: (field) =>
    isEn
      ? `Value can't be less than ${field.min}`
      : `Значение не может быть меньше ${field.min}`,
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
  needSales: positiveInteger,
  needProfit: positiveFloat,
  haveVisitors: positiveInteger,
  haveOrders: positiveInteger.when('haveVisitors', (haveVisitors, schema) => {
    if (!Number(haveVisitors)) return schema.min(0, em.min)
    return haveVisitors
      ? schema.max(haveVisitors, em.max)
      : schema.min(0, em.min)
  }),
  haveSales: positiveInteger.when('haveOrders', (haveOrders, schema) => {
    if (!Number(haveOrders)) return schema.min(0, em.min)
    return haveOrders ? schema.max(haveOrders, em.max) : schema.min(0, em.min)
  }),
  haveProfit: positiveFloat,
  transitionCost: positiveFloat,
})

export default schema
