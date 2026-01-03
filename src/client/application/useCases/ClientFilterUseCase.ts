import { inject, injectable } from "inversify"
import { IUseCase } from "../../../shared/domain/interface/IUseCase"
import { ArrayFilter } from "../../../shared/application/DTOs/FilterParam"
import { IClientRepository } from "../../domain/repository/IClientRepository"
import { ClientProps } from "../../domain/model/Client"

@injectable()
export class ClientFilterUseCase implements IUseCase {
    constructor(
        @inject("IClientRepository")
        private readonly clientRepository: IClientRepository
    ) {}

    async execute(array: ArrayFilter): Promise<ClientProps[]> {
        return await this.clientRepository.filter(array.params)
    }
}
