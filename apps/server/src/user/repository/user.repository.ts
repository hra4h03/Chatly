import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserRepository {
    private readonly users: Array<User> = [];

    findAll(): User[] {
        return this.users;
    }

    findByUuid(uuid: string): User | undefined {
        return this.users.find((user) => user.uuid === uuid);
    }

    findByName(name: string): User | undefined {
        return this.users.find((user) => user.name === name);
    }

    save(user: User): void {
        this.users.push(user);
    }
}
