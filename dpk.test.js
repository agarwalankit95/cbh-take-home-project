const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey with empty input", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});

describe("deterministicPartitionKey with input value without partitionKey", () => {
  const getResultAndExpectedResult = (input) => {
    return {
      trivialKey: deterministicPartitionKey(input),
      expectedResult: crypto.createHash("sha3-512").update(JSON.stringify(input)).digest("hex")
    };
  };

  it("Returns the deterministicPartitionKey when given input is a number", () => {
    const input = 123; // number
    const { trivialKey, expectedResult } = getResultAndExpectedResult(input);
    
    expect(trivialKey).toBe(expectedResult);
  });

  it("Returns the deterministicPartitionKey when given input is a string", () => {
    const input = "test"; // string
    const { trivialKey, expectedResult } = getResultAndExpectedResult(input);
    
    expect(trivialKey).toBe(expectedResult);
  });

  it("Returns the deterministicPartitionKey when given input is a boolean", () => {
    const input = true; // boolean
    const { trivialKey, expectedResult } = getResultAndExpectedResult(input);
    
    expect(trivialKey).toBe(expectedResult);
  });

  it("Returns the deterministicPartitionKey when given input is an empty object", () => {
    const input = {}; // empty object
    const { trivialKey, expectedResult } = getResultAndExpectedResult(input);
    
    expect(trivialKey).toBe(expectedResult);
  });

  it("Returns the deterministicPartitionKey when given input is an object with some other key", () => {
    const input = { test: 123 }; // object with key other than partitionKey
    const { trivialKey, expectedResult } = getResultAndExpectedResult(input);

    expect(trivialKey).toBe(expectedResult);
  });

  it("Returns the deterministicPartitionKey when given input is an array", () => {
    const input = ["test"]; // result will be same with empty array as well so extra test not required
    const { trivialKey, expectedResult } = getResultAndExpectedResult(input);
    
    expect(trivialKey).toBe(expectedResult);
  });
});

describe("deterministicPartitionKey with input value as object with partitionKey", () => {
  const MAX_PARTITION_KEY_LENGTH = 256;

  it(`Returns the partitionKey value when given input is an object with partitionKey and partitionKey value is string with length <= ${MAX_PARTITION_KEY_LENGTH} `, () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "test test test" });
    expect(trivialKey).toBe("test test test");
  });

  it(`Returns the deterministicPartitionKey when given input is an object with partitionKey and partitionKey value is string with length > ${MAX_PARTITION_KEY_LENGTH} `, () => {
    const input = { partitionKey: "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test" };
    const trivialKey = deterministicPartitionKey(input);
    const expectedResult = crypto.createHash("sha3-512").update(input.partitionKey).digest("hex");
    expect(trivialKey).toBe(expectedResult);
  });

  // both the above tests will be same with partitionKey value as non-string, so no need to add extra tests.

});