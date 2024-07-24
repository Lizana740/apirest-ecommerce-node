import main from "../../../src/app"
import request from "supertest"
import { FormUserCreate } from "../../../src/application/DTOs/FormUserCreate"
import { Validate } from "../../../src/infraestructure/utils/Validate"
import { makeErrorResponse } from "../../../src/infraestructure/utils/makeResponses"
import { CategoryDto } from "../../../src/application/DTOs/CategoryDto"
import { NotFoundElement } from "../../../src/infraestructure/exceptions/NotFoundElement"

describe("Category [REST::CONTROLLER]", () => {
    let app!: any
    const category: CategoryDto = {
        name: "Category test",
        description: "Descripcion",
    }

    beforeEach(async () => {
        app = await main(false)
    })

    it("POST /api/category/", async () => {
        const response = await request(app).post("/api/category").send(category)

        expect(response.status).toBe(201)
        expect(response.body.data).toBeTruthy()
        expect(response.body.data).toMatchObject({ id: response.body.data.id })

        const delResponse = await request(app).delete(
            "/api/category/" + response.body.data.id
        )
    })

    it("GET /api/category/all", async () => {
        const response = await request(app).get("/api/category/all")
        const list = response.body.data
        expect(response.status).toBe(200)
        expect(list).toBeTruthy()
    })

    it("GET /api/category/:id", async () => {
        const r = await request(app).post("/api/category").send(category)
        const response = await request(app).get(
            "/api/category/" + r.body.data.id
        )
        expect(response.status).toBe(200)
        expect(response.body.data).toBeTruthy()
        await request(app).delete("/api/category/" + r.body.data.id)
    })

    it("GET /api/category/:id, id not exits", async () => {
        const response = await request(app).get(
            "/api/category/66a13cee8ff6cd707b077582"
        )
        expect(response.status).toBe(401)
        const error = new NotFoundElement()
        expect(response.body.error).toBe(error.name)
    })

    it("DELETE /api/category/:id", async () => {
        const response = await request(app).post("/api/category").send(category)
        const delResponse = await request(app).delete(
            "/api/category/" + response.body.data.id
        )

        expect(delResponse.body.data).toBeTruthy()
        expect(delResponse.body.data).toMatchObject({
            id: delResponse.body.data.id,
        })
    })
    it("DELETE /api/category/:id , id not exists", async () => {
        const delResponse = await request(app).delete(
            "/api/category/66a13cee8ff6cd707b077582"
        )
        expect(delResponse.body.error).toBeTruthy()
    })

    it("PUT /api/category/:id", async () => {
        const response = await request(app).post("/api/category").send(category)
        const categoryMod = {
            params: [{ field: "name", value: "New Category" }],
        }
        const putResponse = await request(app)
            .put("/api/category/" + response.body.data.id)
            .send(categoryMod)

        expect(putResponse.status).toBe(201)
        expect(putResponse.body.data).toMatchObject({
            name: "New Category",
            description: "Descripcion",
        })
        await request(app).delete("/api/category/" + response.body.data.id)
    })

    it("PUT /api/category/:id, id not exist", async () => {
        const categoryMod = {
            params: [{ field: "name", value: "New Category" }],
        }
        const putResponse = await request(app)
            .put("/api/category/66a13cee8ff6cd707b077582")
            .send(categoryMod)
        expect(putResponse.status).toBe(401)
        expect(putResponse.body.error).toBeTruthy()

    })

    it("POST /api/category , duplicate name", async () => {
        const response = await request(app).post("/api/category").send(category)
        const duplicate = await request(app)
            .post("/api/category")
            .send(category)
        expect(duplicate.status).toBe(401)
        expect(duplicate.body.error).toBe("IndexDuplicate")

        await request(app).delete("/api/category/" + response.body.data.id)
    })

    it("POST /api/category , error validation", async () => {
        const categoryDto = {
            name: "User 1",
        }
        let validateResponse: any
        try {
            Validate.validate(CategoryDto, categoryDto)
        } catch (e) {
            validateResponse = makeErrorResponse(e)
        }

        const response = await request(app)
            .post("/api/category")
            .send(categoryDto)
        expect(response.status).toBe(401)
        expect(response.body.error).toBe(validateResponse.error)
        expect(response.body.params).toMatchObject(validateResponse.params)
    })
})
