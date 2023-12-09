class InvalidGridSizeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidGridSize';
  }
}

export default InvalidGridSizeError;
