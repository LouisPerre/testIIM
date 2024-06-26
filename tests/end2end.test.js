import {calldependance} from "../src/callDependance.js";
import * as axios from 'axios'

const User = require("../src/classes");
const url = "https://us-east1-sacred-vigil-423308-v6.cloudfunctions.net";
const bearer = process.env.BEARER_TOKEN || ""
describe('The calldependance response url with name will return a string with the name passed as a query parameter', () => {
    it('should return a string with the name passed as a query parameter', async () => {
        try {
            const user = new User("Louus", "louis@icloud.com");
            user.isValid();
            const name = user.name;
            const uri = calldependance(name);
            expect(uri).toBe(`/action?name=${name}`);
            const response = await axios.get(url + uri, {
                headers: {
                    Authorization: `Bearer ${bearer}`
                }
            });
            expect(response.status).toBe(200);
            expect(response.data).toBe(`Hello ${name}!`);
        } catch (error) {
            console.log(error);
        }
    });
});
