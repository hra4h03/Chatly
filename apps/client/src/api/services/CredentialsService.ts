import { AxiosBasicCredentials } from 'axios';

export class CredentialsService {
    static store(credentials: AxiosBasicCredentials) {
        const base64 = btoa(`${credentials.username}:${credentials.password}`);
        localStorage.setItem('credentials', base64);
    }

    static clear() {
        localStorage.removeItem('credentials');
    }

    static get() {
        const base64 = localStorage.getItem('credentials');
        if (!base64) return;

        const [username, password] = atob(base64).split(':');
        const credentials: AxiosBasicCredentials = { username, password };
        return credentials;
    }

    static getAsToken() {
        const credentials = localStorage.getItem('credentials');
        if (!credentials) return;

        return `Basic ${credentials}`;
    }
}
