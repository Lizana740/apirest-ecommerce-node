import { Container, ContainerModule, interfaces } from "inversify"
import { ReviewAddUseCase } from "../application/useCase/ReviewAddUseCase"
import { ReviewDeleteUseCase } from "../application/useCase/ReviewDeleteUseCase"
import { ReviewFilterUseCase } from "../application/useCase/ReviewFilterUseCase"
import { ReviewGetAll } from "../application/useCase/ReviewGetAll"
import { ReviewGetByIdUseCase } from "../application/useCase/ReviewGetByIdUseCase"
import { IReviewRepository } from "../domain/repository/IReviewRepository"
import { ReviewRepositoryImplement } from "./repository/ReviewRepositoryImplement"
import { ReviewController } from "./rest/ReviewController"

const moduleReview = new ContainerModule((bind: interfaces.Bind) => {
  bind<IReviewRepository>("IReviewRepository").to(ReviewRepositoryImplement)

  //->>[REVIEW]<<-/Review/
  bind<ReviewAddUseCase>(ReviewAddUseCase).to(ReviewAddUseCase)
  bind<ReviewGetAll>(ReviewGetAll).to(ReviewGetAll)
  bind<ReviewFilterUseCase>(ReviewFilterUseCase).to(ReviewFilterUseCase)
  bind<ReviewDeleteUseCase>(ReviewDeleteUseCase).to(ReviewDeleteUseCase)
  bind<ReviewGetByIdUseCase>(ReviewGetByIdUseCase).to(ReviewGetByIdUseCase)

  bind<ReviewController>(ReviewController).to(ReviewController)
})
export default moduleReview
