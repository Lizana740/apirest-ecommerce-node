import { inject, injectable } from "inversify"
import { IUseCase } from "../../../shared/domain/interface/IUseCase"
import { IClientRepository } from "../../domain/repository/IClientRepository"
import { ClientProps } from "../../domain/model/Client"

@injectable()
export class ClientGetByIdUseCase implements IUseCase {
    constructor(
        @inject("IClientRepository")
        private readonly userRepository: IClientRepository
    ) {}

    async execute(id: number): Promise<ClientProps | null> {
        return await this.userRepository.getById(id)
    }
}
