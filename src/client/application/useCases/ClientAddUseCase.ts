import { inject, injectable } from "inversify"
import { IUseCase } from "../../../shared/domain/interface/IUseCase"
import { IClientRepository } from "../../domain/repository/IClientRepository"
import { ClientProps } from "../../domain/model/Client"

@injectable()
export class ClientAddUseCase implements IUseCase {
    constructor(
        @inject("IClientRepository")
        private readonly clientRepository: IClientRepository
        
    ) {}

    async execute(p: ClientProps) {
        const r = await this.clientRepository.add(p)
        return r 
    }
}
