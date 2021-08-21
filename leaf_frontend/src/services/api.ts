import axios from "axios";

export default class APIService {

    static async requestToken(username: string, password: string): Promise<any> {
        const payload = {
            username: username,
            password: password
        };

        try {
            let res = await axios.post("http://localhost:8000/token", payload);
            let data = res.data;
            return data;
        } catch (e) {
            throw e
        }
    }
}
