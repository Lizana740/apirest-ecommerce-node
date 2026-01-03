import { inject, injectable } from "inversify"
import { ClientProps } from "../../domain/model/Client"
import { IClientRepository } from "../../domain/repository/IClientRepository"
import { IUseCase } from "../../../shared/domain/interface/IUseCase"

@injectable()
export class ClientUpdateUseCase implements IUseCase {
    constructor(
        @inject("IClientRepository")
        private readonly userRepository: IClientRepository
    ) {}

    async execute(id: number, user: ClientProps): Promise<void> {
        return await this.userRepository.updateById(id, user)
    }
}
