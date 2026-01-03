import { inject, injectable } from "inversify"
import { IUseCase } from "../../../shared/domain/interface/IUseCase"
import { IClientRepository } from "../../domain/repository/IClientRepository"

@injectable()
export class ClientGetAll implements IUseCase {
  constructor(
    @inject("IClientRepository") private readonly clientRepository: IClientRepository,
  ) {}

  async execute() {
    const clients = await this.clientRepository.getAll()
    return clients 
  }
}
