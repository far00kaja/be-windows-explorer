// tests/api.test.ts
import { describe, it, expect } from "bun:test";
import { app } from "../src/app";

describe("POST /api/v1/directory", () => {
  it("should return data with status 201", async () => {
    const res = await app.handle(
      new Request("http://localhost/api/v1/directory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "master folder name" + Math.ceil(Math.random() * 10000),
        }),
      })
    );

    const json = await res.json();
    expect(res.status).toBe(201);
    expect(json.message).toBe("success");
    expect(json.status).toBe(201);
  });
});
