import axios from "axios";
import {PROCESS_RECEIPT_ENDPOINT, REFRESH_TOKEN_ENDPOINT, TOKEN_ENDPOINT} from "../utils/constant";

export default class APIService {

    static async requestToken(username: string, password: string): Promise<any> {
        try {
            const payload = {
                username: username,
                password: password
            };

            let res = await axios.post(TOKEN_ENDPOINT, payload);
            let data = res.data;
            return data;
        } catch (e) {
            throw e
        }
    }

    static async refreshToken(token: string): Promise<any> {
        try {
            const payload = {
                refresh: token
            };

            let res = await axios.post(REFRESH_TOKEN_ENDPOINT, payload);
            let data = res.data;
            return data;
        } catch (e) {
            throw e
        }
    }

    static async processReceipt(file: any, token: string): Promise<any> {
        try {
            const payload = {
                file: file.result
            };
            const config = {
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Content-Type': 'text/plain; charset=UTF-8',
                    'Content-Disposition': `attachment ; filename=${file.name}`,
                }
            };

            let res = await axios.post(PROCESS_RECEIPT_ENDPOINT, payload, config);
            let data = res.data;
            return data;
        } catch (e) {
            throw e
        }
    }
}
