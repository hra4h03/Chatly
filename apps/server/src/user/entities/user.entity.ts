import { HashUtils } from 'src/utils/hash.utils';
import { v4 as uuidv4 } from 'uuid';

export class User {
    static async create(fields: {
        name: string;
        password: string;
    }): Promise<User> {
        const hashedPassword = await HashUtils.hash(fields.password);
        return new User(fields.name, hashedPassword);
    }

    public uuid: string;
    public name: string;
    public readonly password: string;

    private constructor(name: string, password: string) {
        this.uuid = uuidv4();
        this.name = name;
        this.password = password;
    }
}
