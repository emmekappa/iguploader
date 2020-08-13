import {expect} from "chai"
import {PhotoValidator} from "../src/photo/photoValidator";
import path from "path"

describe('PhotoValidator', () => {
    it('fail on wrong aspect ratio', async () => {
        const wrongAspectRatioFilePath = path.join(__dirname, "./photo/invalid_aspect_ratio.jpeg");
        const result = await new PhotoValidator().isValid(wrongAspectRatioFilePath)
        expect(result.isValid).eq(false)
        expect(result.reason).match(/Aspect ratio (.*) is invalid/)
    })
})
