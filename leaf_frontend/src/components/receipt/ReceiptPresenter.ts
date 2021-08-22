import APIService from "../../services/api";
import {IReceipt} from "./Receipt";
import LocalStorage from "../../services/localstorage";

export interface IReceiptPresenter {
    processReceipt(file: any): any;
}

export default class ReceiptPresenter implements IReceiptPresenter {

    view: IReceipt;
    token: string;

    constructor(view: IReceipt) {
        this.view = view;
        this.token = LocalStorage.getAccessToken().toString();
    }

    processReceipt(file: any): any {
        APIService.processReceipt(file, this.token).then(res => {
            if(res) {
                this.view.onProcessSucess(res.blocks);
            }
        }).catch(e => {
            // Try to refresh the token
            let refreshToken = LocalStorage.getRefreshToken();
            APIService.refreshToken(refreshToken).then(res => {
                if(res) {
                    this.token = res.access;
                    LocalStorage.saveTokens(res.access, refreshToken);
                    this.processReceipt(file);
                }
            }).catch(e => {
                // TO-DO
            })
        })
    }
}