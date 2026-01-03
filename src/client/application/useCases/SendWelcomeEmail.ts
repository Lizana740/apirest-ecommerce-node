import { inject, injectable } from "inversify"
import { IClientRepository } from "../../domain/repository/IClientRepository"

@injectable()
export class SendWelcomeEmail {
    constructor(
      @inject('IClientRepository') private clientRepository: IClientRepository
    ) {}

    async execute(name:string, email:string): Promise<void> {    
      console.log(`Se a enviado un correo a ${name} : ${email}`)
    }
}