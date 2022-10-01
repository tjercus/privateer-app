import { describe, expect } from "vitest";
import { ZodIssue } from "zod";
//
import { hasIssues } from "./utils";

describe("utils", () => {
  describe("hasIssues", () => {
    const validationIssues = [
      { path: ["yoda"] },
      { path: ["vader"] },
    ] as Array<ZodIssue>;
    it("should find a singular issue", () =>
      expect(hasIssues(validationIssues, "vader")).to.be.true);
    it("should find a multiple issue", () =>
      expect(hasIssues(validationIssues, ["vader"])).to.be.true);
    it("should find a multiple issue", () =>
      expect(hasIssues(validationIssues, ["vader", "mando"])).to.be.true);
    //
    it("should NOT find a NON EXISTING singular issue", () =>
      expect(hasIssues(validationIssues, "leia")).to.be.false);
    it("should NOT find a NON EXISTING multiple issue", () =>
      expect(hasIssues(validationIssues, ["leia"])).to.be.false);
    it("should NOT find a field in an empty list", () =>
      expect(hasIssues([], "yoda")).to.be.false);
    it("should NOT find an empty field", () =>
      expect(hasIssues(validationIssues, "")).to.be.false);
  });
});
