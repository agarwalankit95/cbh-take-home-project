const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

/**
 * @param { partitionKey?: string } event?: Event 
 * @returns { string } hex value of event, if present otherwise TRIVIAL_PARTITION_KEY 
 */
exports.deterministicPartitionKey = (event) => {
  
  // return default value if event is not defined
  if (!event) return TRIVIAL_PARTITION_KEY;

  // extracted hashing mechanish in a function to reduce repetition of logic
  const getHash = (salt) => crypto.createHash("sha3-512").update(salt).digest("hex");

  let candidate;

  if (event.partitionKey) {
    candidate = event.partitionKey;

    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }

    // return hash only if string value length greater than MAX_PARTITION_KEY_LENGTH
    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = getHash(candidate);
    }
  } else {
    // return hash with string value
    candidate = getHash(JSON.stringify(event));
  }

  return candidate;
};