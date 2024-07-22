import { Response, Request } from "express"
export class Logger {
  constructor() {
    console.log("[OK] --> Logger Run")
  }

  async register(req: Request, res: Response, next: any) {
    console.log(`[${req.method.toLocaleUpperCase()}] ${req.url}`)
    next()
  }
}
