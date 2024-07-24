import express from "express"
import routerProduct from "../src/infraestructure/rest/product/ProductRouter"
import routerUser from "../src/infraestructure/rest/user/UserRouter"
import routerAuth from "../src/infraestructure/rest/auth/AuthRouter"
const routerApi = express.Router()

routerApi.use("/product", routerProduct)
routerApi.use("/user", routerUser)
routerApi.use("/auth", routerAuth)

export default routerApi
