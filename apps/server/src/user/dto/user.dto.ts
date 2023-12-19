import { User } from 'src/user/entities/user.entity';

export class UserDto {
    static fromEntity(entity: User | User[]) {
        if (Array.isArray(entity)) {
            return entity.map((e) => this.fromEntity(e));
        }
        const dto = new UserDto();
        dto.uuid = entity.uuid;
        dto.name = entity.name;
        return dto;
    }

    uuid: string;
    name: string;
}
