import express from "express"
import { ReviewController } from "./ReviewController"
import { baseContainer } from "../../../shared/infrastructure/base.container"
const routerReview = express.Router()

const controller = baseContainer.get(ReviewController)

routerReview.post("/", controller.addReview.bind(controller))
routerReview.get("/all", controller.getAllReviews.bind(controller))
routerReview.get("/s?", controller.getByUserFilter.bind(controller))

routerReview.delete("/:id", controller.deleteReviewById.bind(controller))
/*routerUser.get("/:id", controller.getUserById.bind(controller))
routerUser.put("/:id", controller.updateUserById.bind(controller)) */

export default routerReview
