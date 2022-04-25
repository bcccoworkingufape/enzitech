import * as faker from 'faker';
import { CreateUserDto } from '../../../src/presentation/dtos/user/create-user.dto';
import { ListUserDto } from '../../../src/presentation/dtos/user/list-user.dto';
import { UpdateUserDto } from '../../../src/presentation/dtos/user/update-user.dto';
import { UserDto } from '../../../src/presentation/dtos/user/user.dto';
import { UserRole } from '../../../src/presentation/dtos/user/enums/user-role.enum';
import { User } from '../../../src/domain/models/user.entity';

export class UserDtoMock {
  static mockUserEntity(partial?: Partial<User>): User {
    return new User({
      id: partial?.id ?? faker.datatype.uuid(),
      email: partial?.email ?? faker.internet.email(),
      name: partial?.name ?? faker.name.firstName(),
      role: partial?.role ?? UserRole.Admin,
      createdAt: partial?.createdAt ?? new Date(),
      updatedAt: partial?.updatedAt ?? new Date(),
      passwordHash: partial?.passwordHash ?? faker.random.alphaNumeric(32),
    });
  }

  static mockCreateUserDto(partial?: Partial<CreateUserDto>): CreateUserDto {
    return new CreateUserDto({
      email: partial?.email ?? faker.internet.email().toLowerCase(),
      name: partial?.name ?? faker.name.firstName(),
      password: partial?.password ?? faker.internet.password(12),
    });
  }

  static mockUpdateUserDto(partial?: Partial<UpdateUserDto>): UpdateUserDto {
    return new UpdateUserDto({ ...partial });
  }

  static mockUserDto(partial?: Partial<UserDto>): UserDto {
    return new UserDto({
      id: partial?.id ?? faker.datatype.uuid(),
      email: partial?.email ?? faker.internet.email(),
      name: partial?.name ?? faker.name.firstName(),
      role: partial?.role ?? UserRole.User,
      createdAt: partial?.createdAt ?? new Date(),
      updatedAt: partial?.updatedAt ?? new Date(),
    });
  }

  static mockListUserDto(data?: ListUserDto): ListUserDto {
    if (data === undefined) {
      return new ListUserDto({
        count: 1,
        users: [this.mockUserDto()],
      });
    }

    return new ListUserDto({
      count: data.count,
      users: data.users,
    });
  }
}
