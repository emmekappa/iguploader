import {AspectRatioValidator} from "./aspectRatioValidator";
import {OkValidator} from "./okValidator";
import {PhotoValidatorHandler, ValidationResult} from "./photoValidatorHandlers";
import Jimp from "jimp";

export class PhotoValidator {
    private rootHandler: PhotoValidatorHandler

    constructor() {
        this.rootHandler = new AspectRatioValidator()
        this.rootHandler.setNext(new OkValidator())
    }

    async isValid(path: string): Promise<ValidationResult> {
        const picture = await Jimp.read(path);
        return this.rootHandler.handle(picture)
    }
}
