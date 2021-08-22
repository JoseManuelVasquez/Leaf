export default class LocalStorage {

    static saveTokens(accessToken: string, refreshToken: string): void {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }

    static getAccessToken(): string {
        let accessToken = localStorage.getItem('accessToken');
        if (accessToken)
            return accessToken;
        return "";
    }

    static getRefreshToken(): string {
        let refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken)
            return refreshToken;
        return "";
    }
}
