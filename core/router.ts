import express from 'express'
import routerProduct from '../src/infraestructure/rest/product/ProductRouter'
import routerUser from '../src/infraestructure/rest/user/UserRouter'
const routerApi = express.Router()

routerApi.use('/product', routerProduct)
routerApi.use('/user', routerUser)

export default routerApi