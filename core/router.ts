import express from "express"
import routerProduct from "../src/infraestructure/rest/product/ProductRouter"
import routerUser from "../src/infraestructure/rest/user/UserRouter"
import routerAuth from "../src/infraestructure/rest/auth/AuthRouter"
import routerCategory from "../src/infraestructure/rest/category/CategoryRouter"
import routerReview from "../src/infraestructure/rest/review/ReviewRouter"
const routerApi = express.Router()

routerApi.use("/product", routerProduct)
routerApi.use("/user", routerUser)
routerApi.use("/auth", routerAuth)
routerApi.use("/category", routerCategory)
routerApi.use("/review", routerReview)


export default routerApi
