import APIService from "../../services/api";
import {ISignup} from "./Signup";

export interface ISignupPresenter {
    signUp(username: string, password: string): void;
}

export default class LoginPresenter {

    view: ISignup;

    constructor(view: ISignup) {
        this.view = view;
    }

    signUp(username: string, password: string): void {
        APIService.signUp(username, password).then(res => {
            if(res.success) {
                this.view.onSignUp()
            } else {
                this.view.onError()
            }
        }).catch(e => {
            this.view.onError();
        })
    }
}