import supertest from "supertest";
import app from "../../server";

const request = supertest(app);
const jobList = "http://localhost:5001/categories";

describe("Category routes API", () => {
  it("should be list of jobs", async () => {
    request.get(jobList).expect(200);
  });
});
