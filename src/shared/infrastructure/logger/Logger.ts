import { Response, Request } from "express"
export class Logger {
  constructor(private consol:boolean) {
    if(this.consol){
      console.log("[OK] --> Logger Run")
    }
  }

  async register(req: Request, res: Response, next: any) {
    if(this.consol){
      console.log(`[${req.method.toLocaleUpperCase()}] ${req.url}`)
    }
    next()
  }
}
