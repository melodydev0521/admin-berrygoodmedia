import isEmpty from "is-empty";
import { ISnapSet } from "../models/SnapSet";
import { IFormValidate } from "./formValidate";

const snapsetValidate = (data: ISnapSet): IFormValidate => {

    const errors = {
        accountType: '',
        name: '',
        token: ''
    };

    var isValid: boolean = true;

    if (isEmpty(data.accountType)) {
        errors.accountType = "Account Type is requried";
        isValid = false;
    }

    if (isEmpty(data.name)) {
        errors.name = "Name is requried";
        isValid = false;
    }

    if (isEmpty(data.token)) {
        errors.token = "Token is required";
        isValid = false;
    }

    return {
        isValid: isValid,
        errors: errors
    };
}

export default snapsetValidate;