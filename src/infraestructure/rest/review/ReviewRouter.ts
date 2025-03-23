import express from "express"
import { ReviewController } from "./ReviewController"
import container from "../../../../config/container"
const routerReview = express.Router()

const controller = container.get(ReviewController)

routerReview.post("/", controller.addReview.bind(controller))
routerReview.get("/all", controller.getAllReviews.bind(controller))
routerReview.get("/s?", controller.getByUserFilter.bind(controller))

routerReview.delete("/:id", controller.deleteReviewById.bind(controller))
/*routerUser.get("/:id", controller.getUserById.bind(controller))
routerUser.put("/:id", controller.updateUserById.bind(controller)) */

export default routerReview
