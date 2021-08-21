export default class LocalStorage {

    static saveTokens(accessToken: string, refreshToken: string): void {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }

    static getAccessToken() {
        let accessToken = localStorage.getItem('acessToken');
        if (accessToken)
            return accessToken;
        return;
    }

    static getRefreshToken() {
        let refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken)
            return refreshToken;
        return;
    }
}
