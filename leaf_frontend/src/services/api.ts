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
            const formData = new FormData();
            formData.append('file',file);
            const config = {
                headers: {
                    'authorization': `Bearer ${token}`,
                    'content-disposition': `attachment ; filename=${file.filename}`,
                    'content-type': 'multipart/form-data'
                }
            };

            let res = await axios.post(PROCESS_RECEIPT_ENDPOINT, formData,config);
            let data = res.data;
            return data;
        } catch (e) {
            throw e
        }
    }
}
