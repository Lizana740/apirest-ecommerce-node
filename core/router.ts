import express from 'express'
import routerProduct from '../src/infraestructure/rest/product/ProductRouter'

const routerApi = express.Router()

routerApi.use('/product', routerProduct)

export default routerApi