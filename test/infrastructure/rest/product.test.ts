import main from "../../../src/app"
import request from "supertest"
import { ProductDto } from "../../../src/application/DTOs/product/ProductDto"
import { NotFoundElement } from "../../../src/infraestructure/exceptions/NotFoundElement"

describe("Product [REST::CONTROLLER]", () => {
    let app!: any
    beforeEach(async () => {
        app = await main()
    })

    it("GET /api/product/all", async () => {
        const response = await request(app).get("/api/product/all")
        const list = response.body.data
        expect(response.status).toBe(200)
        expect(list).toBeTruthy()
    })

    it("POST /api/product/", async () => {
        const produtc: ProductDto = {
            description: "description",
            name: "producto test",
            quantity: 100,
            brand:"",
            category:"",
            price:100
        }
        const response = await request(app).post("/api/product").send(produtc)
        expect(response.status).toBe(201)
        expect(response.body.data).toBeTruthy()
        expect(response.body.data).toMatchObject({ id: response.body.data.id })
    })

    it("GET /api/product/:id", async () => {
        const response = await request(app).get("/api/product/66a13cee8ff6cd707b077582")
        expect(response.status).toBe(401)
        const error = new NotFoundElement()
        expect(response.body.error).toBe(error.name)
    })
})
