import Jimp from "jimp";
import {
  AbstractPhotoValidatorHandler,
  ValidationResult,
} from "./photoValidatorHandlers";

export class OkValidator extends AbstractPhotoValidatorHandler {
  handle(picture: Jimp): Promise<ValidationResult> {
    return Promise.resolve<ValidationResult>({
      isValid: true,
      reason: "everything ok",
    });
  }
}

export default OkValidator;
