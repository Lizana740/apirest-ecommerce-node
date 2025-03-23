export interface IEmailService {
    send(email:string):Promise<void>;
}