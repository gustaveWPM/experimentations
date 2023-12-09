import FailedToInitialize from '../FailedToInitialize';

describe('FailedToInitialize', () => {
  it("should increase the coverage, given it's the only purpose of this test", () => {
    const [message, cause] = ['$', '$$'];
    const error = new FailedToInitialize(message, cause);

    expect(error.message).toBe(message);
    expect(error.cause).toBe(cause);
  });
});
