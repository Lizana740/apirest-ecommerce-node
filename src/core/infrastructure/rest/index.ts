import express from 'express'
import routerProduct from '../../../product/infrastructure/rest/ProductRouter'

const routerApi = express.Router()

routerApi.use('/product', routerProduct)

export default routerApi