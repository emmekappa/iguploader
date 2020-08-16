import Jimp from 'jimp';
import {AbstractPhotoValidatorHandler, ValidationResult} from "./photoValidatorHandlers";

/**
 * When you share a photo that has a width between 320 and 1080 pixels, we keep that photo at its original resolution as
 * long as the photo's aspect ratio is between 1.91:1 and 4:5 (a height between 566 and 1350 pixels with a width of 1080
 * pixels).
 */
export class AspectRatioValidator extends AbstractPhotoValidatorHandler {
    async handle(picture: Jimp): Promise<ValidationResult> {
        const aspectRatio = picture.getWidth() / picture.getHeight()
        const isValid = aspectRatio >= 4 / 5 && aspectRatio <= 1.91
        if (!isValid)
            return {isValid: false, reason: `Aspect ratio ${aspectRatio} is invalid (should be between 4:5 and 1.91:1)`}
        return super.handle(picture);
    }
}
