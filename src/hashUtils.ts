import { BinaryLike, createHash } from 'crypto';

function hashString(value:BinaryLike) : string | null {
    if(!value) return null
    
    const hash = createHash('sha256');
    hash.update(value)
    return hash.digest('hex')
}

export {hashString}