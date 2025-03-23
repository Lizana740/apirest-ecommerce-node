import { inject, injectable } from "inversify"
import { IEmailService } from "../../domain/services/IEmailService"
import { IUserRepository } from "../../domain/repository/IUserRepository"

@injectable()
export class SendWelcomeEmail {
    constructor(
      @inject('IUserRepository') private userRepository: IUserRepository,
      @inject('EmailService') private emailService: IEmailService
    ) {}

    async execute(userId:string ): Promise<void> {     
      try {
        const user = await this.userRepository.getById(userId)
        if(!user){
            throw new Error('User not found')
        }
        await this.emailService.send(user.getEmail)
      } catch(error: any) {
        // save error in tracing service
      }
    }
}