import {AspectRatioValidator} from "./aspectRatioValidator";
import {OkValidator} from "./okValidator";
import sharp from "sharp";
import {PhotoValidatorHandler, ValidationResult} from "./photoValidatorHandlers";

export class PhotoValidator {
    private rootHandler: PhotoValidatorHandler

    constructor() {
        this.rootHandler = new AspectRatioValidator()
        this.rootHandler.setNext(new OkValidator())
    }

    async isValid(path: string): Promise<ValidationResult> {
        return this.rootHandler.handle(sharp(path))
    }
}
