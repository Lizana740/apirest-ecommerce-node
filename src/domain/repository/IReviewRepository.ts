import { Review } from "../entity/Review";
import { IRepository } from "../interface/IRepository";

export interface IReviewRepository extends IRepository<Review, String>{

}