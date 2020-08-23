import {AbstractPhotoValidatorHandler, ValidationResult} from "./photoValidatorHandlers";
import Jimp from "jimp";

export class OkValidator extends AbstractPhotoValidatorHandler {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handle(picture: Jimp): Promise<ValidationResult> {
        return Promise.resolve<ValidationResult>({isValid: true, reason: "everything ok"})
    }
}
