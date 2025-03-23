import { Review } from "../entity/Review";
import { IRepository } from "../../../shared/domain/interface/IRepository";

export interface IReviewRepository extends IRepository<Review, String>{

}