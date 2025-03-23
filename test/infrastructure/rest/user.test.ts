import main from "../../../src/app"
import request from "supertest"
import { FormUserCreate } from "../../../src/application/DTOs/FormUserCreate"
import { ValidationError } from "../../../src/infraestructure/exceptions/ValidationError"
import { Validate } from "../../../src/infraestructure/utils/Validate"
import { makeErrorResponse } from "../../../src/infraestructure/utils/makeResponses"
import { NotFoundElement } from "../../../src/infraestructure/exceptions/NotFoundElement"

describe("User [REST::CONTROLLER]", () => {
    let app!: any
    const user: FormUserCreate = {
        name: "ARSSSSS",
        lastname: "apellido",
        email: "asssb@email.com",
        address: "Adrres 123",
        password: "ARFtg_23dadw",
    }

    beforeEach(async () => {
        app = await main(false)
    })

    it("POST /api/user/", async () => {
        const response = await request(app).post("/api/user").send(user)

        expect(response.status).toBe(201)
        expect(response.body.data).toBeTruthy()
        expect(response.body.data).toMatchObject({ id: response.body.data.id })

        const delResponse = await request(app).delete(
            "/api/user/" + response.body.data.id
        )
    })

    it("GET /api/user/all", async () => {
        const response = await request(app).get("/api/user/all")
        const list = response.body.data
        expect(response.status).toBe(200)
        expect(list).toBeTruthy()
    })

    it("GET /api/user/:id", async () => {
        const response = await request(app).get("/api/user/66a13cee8ff6cd707b077582")
        expect(response.status).toBe(401)
        const error = new NotFoundElement()
        expect(response.body.error).toBe(error.name)
    })

    it("DELETE /api/user/:id", async () => {
        const response = await request(app).post("/api/user").send(user)
        const delResponse = await request(app).delete(
            "/api/user/" + response.body.data.id
        )

        expect(delResponse.body.data).toBeTruthy()
        expect(delResponse.body.data).toMatchObject({
            id: delResponse.body.data.id,
        })
    })

    it("PUT /api/user/:id", async () => {
        const response = await request(app).post("/api/user").send(user)
        const userMod = {
            params: [{ field: "name", value: "NEW RSSS" }],
        }
        const putResponse = await request(app)
            .put("/api/user/" + response.body.data.id)
            .send(userMod)

        expect(putResponse.status).toBe(201)
        expect(putResponse.body.data).toMatchObject({
            email: user.email,
            lastname: user.lastname,
            address: user.address,
            name: "NEW RSSS",
        })
        await request(app).delete("/api/user/" + response.body.data.id)
    })

    it("POST /api/user , duplicate email", async () => {
        const response = await request(app).post("/api/user").send(user)
        const duplicate = await request(app).post("/api/user").send(user)
        expect(duplicate.status).toBe(401)
        expect(duplicate.body.error).toBe("IndexDuplicate")

        await request(app).delete("/api/user/" + response.body.data.id)
    })

    it("POST /api/user , error validation", async () => {
        const errorUserDto = {
            name: "User 1",
            lastname: "lastname 1",
            email: "icorrect email",
            password: "",
        }
        let validateResponse: any
        try {
            Validate.validate(FormUserCreate, errorUserDto)
        } catch (e) {
            validateResponse = makeErrorResponse(e)
        }

        const response = await request(app).post("/api/user").send(errorUserDto)
        expect(response.status).toBe(401)
        expect(response.body.error).toBe(validateResponse.error)
        expect(response.body.params).toMatchObject(validateResponse.params)
    })
})
