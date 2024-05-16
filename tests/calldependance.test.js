import * as faker from 'faker-br'
import { calldependance } from "../src/callDependance.js";

let name = "";

beforeEach(() => {
    name = faker.internet.userName();
})

afterEach(() => {
    name = "";
})

describe("The calldependance function", () => {
    it("should return a string with the name passed as a query parameter", () => {
        const result = calldependance(name);
        expect(result).toBe(`/action?name=${name}`);
    })
})
