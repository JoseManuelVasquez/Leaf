import APIService from "../../services/api";
import {Ilogin} from "./Login";
import LocalStorage from "../../services/localstorage";

export interface ILoginPresenter {
    signIn(username: string, password: string): any;
}

export default class LoginPresenter {

    view: Ilogin;

    constructor(view: Ilogin) {
        this.view = view;
    }

    signIn(username: string, password: string): any {
        APIService.requestToken(username, password).then(res => {
            if(res.access && res.refresh) {
                LocalStorage.saveTokens(res.access, res.refresh);
                this.view.onSignIn()
            }
        }).catch(e => {
            this.view.onError();
        })
    }
}