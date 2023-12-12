class InvalidQuadrantSizeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidQuadrantSize";
  }
}

export default InvalidQuadrantSizeError;
