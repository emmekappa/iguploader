import sharp from "sharp";
import {AbstractPhotoValidatorHandler, ValidationResult} from "./photoValidatorHandlers";

export class OkValidator extends AbstractPhotoValidatorHandler {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handle(picture: sharp.Sharp): Promise<ValidationResult> {
        return Promise.resolve<ValidationResult>({isValid: true, reason: "everything ok"})
    }
}
