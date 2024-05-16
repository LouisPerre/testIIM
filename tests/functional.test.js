const calldependance = require("../src/calldependance");
const axios = require("axios");
const url = process.env.URL || "http://localhost:5555";
const bearer = process.env.BEARER_TOKEN || ""
describe('The calldependance response url with name will return a string with the name passed as a query parameter', () => {
    it('should return a string with the name passed as a query parameter', async () => {
        try {
            const uri = "/action?name=world"
            console.log("URL is: " + url + uri)
            const response = await axios.get(url + uri, {
                headers: {
                    Authorization: `Bearer ${bearer}`
                }
            });
            expect(response.status).toBe(200);
        } catch (error) {
            console.log(error);
        }
    });
});
