import sharp from "sharp";

export interface ValidationResult {
    isValid: boolean;
    reason: string;
}

export interface PhotoValidatorHandler {
    setNext(handler: PhotoValidatorHandler): PhotoValidatorHandler;
    handle(picture: sharp.Sharp): Promise<ValidationResult>;
}

export abstract class AbstractPhotoValidatorHandler implements PhotoValidatorHandler {
    private nextHandler: PhotoValidatorHandler;

    public setNext(handler: PhotoValidatorHandler): PhotoValidatorHandler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(picture: sharp.Sharp): Promise<ValidationResult> {
        if (this.nextHandler) {
            return this.nextHandler.handle(picture);
        }
        throw new Error("No more handler")
    }
}

