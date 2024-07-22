import main from "../src/app";
import request from "supertest";

describe('GET /',()=>{
    it("should return 200 OK", async ()=>{
        const app = await main() as any
        const response = await request(app).get('/')
        expect(response.text).toBe("Application runing!!")
    })
})  