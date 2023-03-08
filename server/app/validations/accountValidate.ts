import isEmpty from "is-empty";
import { IAccounts } from "../models/Accounts";
import { IFormValidate } from "./formValidate";

const accountValidate = (data: IAccounts): IFormValidate => {

    const errors = {
        accountType: '',
        name: '',
        token: '',
        accessToken: ''
    };

    var isValid: boolean = true;

    if (isEmpty(data.accountType)) {
        errors.accountType = "Accountt Type is requried";
        isValid = false;
    }

    if (isEmpty(data.name)) {
        errors.name = "Name is requried";
        isValid = false;
    }

    if (isEmpty(data.token)) {
        errors.token = "Token is requried";
        isValid = false;
    }

    if (data.accountType === "tiktok" && isEmpty(data.accessToken)) {
        errors.accessToken = "Access Token is requried";
        isValid = false;
    }

    return {
        isValid: isValid,
        errors: errors
    };
}

export default accountValidate;