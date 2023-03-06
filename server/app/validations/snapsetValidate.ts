import isEmpty from "is-empty";
import { ISnapSet } from "../models/SnapSet";
import { IFormValidate } from "./formValidate";

const snapsetValidate = (data: ISnapSet): IFormValidate => {

    const errors = {
        name: '',
        campaignId: ''
    };

    var isValid: boolean = true;

    if (isEmpty(data.name)) {
        errors.name = "Name is requried";
        isValid = false;
    }

    if (isEmpty(data.campaignId)) {
        errors.campaignId = "Campaign Id is required";
        isValid = false;
    }

    return {
        isValid: isValid,
        errors: errors
    };
}

export default snapsetValidate;