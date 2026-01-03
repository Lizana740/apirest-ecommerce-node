import { inject, injectable } from "inversify"
import { IUseCase } from "../../../shared/domain/interface/IUseCase"
import { IClientRepository } from "../../domain/repository/IClientRepository"

@injectable()
export class ClientDeleteUseCase implements IUseCase {
    constructor(
        @inject("IClientRepository")
        private readonly clientRepository: IClientRepository
    ) {}

    async execute(id: number) {
        return await this.clientRepository.deleteById(id)
    }
}
