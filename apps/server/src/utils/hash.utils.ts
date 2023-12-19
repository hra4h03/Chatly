import * as bcrypt from 'bcrypt';

export class HashUtils {
    static hash(value: string) {
        return bcrypt.hash(value, 10);
    }

    static compare(value: string, hash: string) {
        return bcrypt.compare(value, hash);
    }
}
