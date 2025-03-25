/* import "reflect-metadata"
import { Container } from "inversify"
import { MongoDB } from "../src/shared/infrastructure/mongo.db"
import moduleAuth from "../src/auth/infrastructure/auth.container"
//import moduleUser from "../src/user/infrastructure/user.container"
import moduleProduct from "../src/product/infrastructure/product.container"
import moduleReview from "../src/review/infrastructure/review.container"
import moduleCategory from "../src/category/infrastructure/category.container"
//import moduleInfrastructure from "../src/shared/infrastructure/container"

const container = new Container({ skipBaseClassChecks: true })

const modules = [
  moduleAuth,
  moduleProduct,
  moduleReview,
  moduleCategory,
]

container
  .bind<MongoDB>(MongoDB)
  .toConstantValue(new MongoDB(process.env.MONGODB ?? "error"))

modules.forEach((module) => {
  container.load(module)
}) */

/* export default container
 */