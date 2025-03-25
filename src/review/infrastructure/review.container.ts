import { ReviewAddUseCase } from "../application/useCase/ReviewAddUseCase"
import { ReviewDeleteUseCase } from "../application/useCase/ReviewDeleteUseCase"
import { ReviewFilterUseCase } from "../application/useCase/ReviewFilterUseCase"
import { ReviewGetAll } from "../application/useCase/ReviewGetAll"
import { ReviewGetByIdUseCase } from "../application/useCase/ReviewGetByIdUseCase"
import { IReviewRepository } from "../domain/repository/IReviewRepository"
import { ReviewRepositoryImplement } from "./repository/ReviewRepositoryImplement"
import { ReviewController } from "./rest/ReviewController"
import { baseContainer } from "../../shared/infrastructure/base.container"


  baseContainer.bind<IReviewRepository>("IReviewRepository").to(ReviewRepositoryImplement)

  //->>[REVIEW]<<-/Review/
  baseContainer.bind<ReviewAddUseCase>(ReviewAddUseCase).to(ReviewAddUseCase)
  baseContainer.bind<ReviewGetAll>(ReviewGetAll).to(ReviewGetAll)
  baseContainer.bind<ReviewFilterUseCase>(ReviewFilterUseCase).to(ReviewFilterUseCase)
  baseContainer.bind<ReviewDeleteUseCase>(ReviewDeleteUseCase).to(ReviewDeleteUseCase)
  baseContainer.bind<ReviewGetByIdUseCase>(ReviewGetByIdUseCase).to(ReviewGetByIdUseCase)

  baseContainer.bind<ReviewController>(ReviewController).to(ReviewController)

