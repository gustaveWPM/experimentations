import type { QuadrantSize } from "@/types";

class InvalidQuadrantSizeError extends Error {
  constructor(got: QuadrantSize, message: string) {
    super(`Got: ${got}` + "\n" + message);
    this.name = "InvalidQuadrantSize";
  }
}

export default InvalidQuadrantSizeError;
