import { LoginModel, SignupModel, UserModel } from '@api/models';
import { CredentialsService } from '@api/services/CredentialsService';
import { HttpClient } from '@api/services/HttpClient';

export class UserService {
    static async login(model: LoginModel) {
        return await HttpClient.post<UserModel>('/auth/login', model);
    }

    static async signup(model: SignupModel) {
        return await HttpClient.post<UserModel>('/auth/signup', model);
    }

    static async me() {
        return await HttpClient.get<UserModel>('/user/me', {
            auth: CredentialsService.get(),
        });
    }
}
