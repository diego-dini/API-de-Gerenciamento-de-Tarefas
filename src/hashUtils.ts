import { BinaryLike, createHash } from 'crypto';

/**
 * Hashes a given string or binary-like input using the SHA-256 algorithm.
 * 
 * @param value - The input value to be hashed. Must be of type BinaryLike (string, Buffer, etc.).
 * @returns The SHA-256 hash of the input in hexadecimal format, or null if the input is falsy.
 */
function hashString(value: BinaryLike): string | null {
    // Check if the input value is falsy (null, undefined, or empty string)
    if (!value) return null;

    // Create a SHA-256 hash instance
    const hash = createHash('sha256');

    // Update the hash with the input value
    hash.update(value);

    // Return the hash in hexadecimal format
    return hash.digest('hex');
}

export { hashString };
