import { inject, injectable } from "inversify"
import { IEmailService } from "../../domain/services/IEmailService"
import { IUserRepository } from "../../domain/repository/IUserRepository"

@injectable()
export class SendWelcomeEmail {
    constructor(
      @inject('IUserRepository') private userRepository: IUserRepository
    ) {}

    async execute(name:string, email:string): Promise<void> {     
      console.log(`Se a enviado un correo a ${name} : ${email}`)
    }
}