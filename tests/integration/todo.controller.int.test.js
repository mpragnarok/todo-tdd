const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos/";
const nonExistingTodoId = "5f34f950a973aae58c223922";
let firstTodo, newTodoId;
const testData = { title: "Make integration test for PUT", done: true };

describe(endpointUrl, () => {
    test("GET" + endpointUrl, async () => {
        const response = await request(app).get(endpointUrl);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].done).toBeDefined();
        firstTodo = response.body[0];
    });
    test("GET by Id" + endpointUrl + ":todoId", async () => {
        const response = await request(app).get(endpointUrl + firstTodo._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(firstTodo.title);
        expect(response.body.done).toBe(firstTodo.done);
    });

    test("GET todo by id doesn't exist" + endpointUrl + "/todoId", async () => {
        const response = await request(app).get(
            endpointUrl + "5f34fadac2ff4becb5e37a18"
        );
        expect(response.statusCode).toBe(404);
    });

    it("POST" + endpointUrl, async () => {
        const response = await request(app).post(endpointUrl).send(newTodo);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
        newTodoId = response.body._id;
    });

    it(
        "should return error 500 on malformed data with POST" + endpointUrl,
        async () => {
            const response = await request(app)
                .post(endpointUrl)
                .send({ title: "Missing done property" });
            expect(response.statusCode).toBe(500);
            expect(response.body).toStrictEqual({
                message:
                    "Todo validation failed: done: Path `done` is required.",
            });
        }
    );

    it("PUT " + endpointUrl, async () => {
        const response = await request(app)
            .put(endpointUrl + newTodoId)
            .send(testData);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(testData.title);
        expect(response.body.done).toBe(testData.done);
        updateTodo = response.body;
    });

    it("should return 404 on PUT" + endpointUrl, async () => {
        const response = await request(app).put(
            endpointUrl + nonExistingTodoId
        );
        expect(response.statusCode).toBe(404);
    });

    it("DELETE" + endpointUrl, async () => {
        const response = await request(app)
            .delete(endpointUrl + newTodoId)
            .send();
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(testData.title);
        expect(response.body.done).toBe(testData.done);
    });

    it("should return 404 on DELETE" + endpointUrl, async () => {
        const res = await request(app)
            .delete(endpointUrl + nonExistingTodoId)
            .send();
        expect(res.statusCode).toBe(404);
    });
});
