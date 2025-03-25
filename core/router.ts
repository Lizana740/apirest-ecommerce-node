import express from "express"
import routerProduct from "../src/product/infrastructure/rest/ProductRouter"
import routerUser from "../src/user/infrastructure/rest/UserRouter"
import routerAuth from "../src/auth/infrastructure/rest/AuthRouter"
import routerCategory from "../src/category/infrastructure/rest/CategoryRouter"
import routerReview from "../src/review/infrastructure/rest/ReviewRouter"
const routerApi = express.Router()

routerApi.use("/product",routerProduct)
routerApi.use("/user", routerUser)
routerApi.use("/category", routerCategory)
routerApi.use("/review", routerReview) 
routerApi.use("/auth", routerAuth)


export default routerApi
