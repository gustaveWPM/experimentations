class FailedToInitializeError extends Error {
  constructor(message: string, cause: unknown) {
    super(message, { cause });
    this.name = 'FailedToInitialize';
  }
}

export default FailedToInitializeError;
