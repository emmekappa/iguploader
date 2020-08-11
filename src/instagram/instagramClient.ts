import {IgApiClient} from "instagram-private-api";
import {IgLocation} from "../IgLocation";
import * as fs from "fs";
import {PostingAlbumPhotoItem} from "instagram-private-api/dist/types/posting.album.options";
import sharp from "sharp";

export class InstagramClient {
    private readonly username: string
    private readonly password: string
    private readonly ig: IgApiClient;
    private readonly userCookiePath: "./.ig-cookie.json";

    constructor(username: string, password: string) {
        this.username = username
        this.password = password
        this.ig = new IgApiClient()
    }

    async login(): Promise<void> {
        this.ig.state.generateDevice(this.username)
        //await this.reloadState()
        await this.ig.account.login(this.username, this.password)
        //await this.saveState()
    }

    private async saveState(): Promise<void> {
        const cookieJar = await this.ig.state.serializeCookieJar()
        fs.writeFileSync(this.userCookiePath, JSON.stringify(cookieJar), 'utf-8')
    }

    private async reloadState(): Promise<void> {
        if (fs.existsSync(this.userCookiePath)) {
            const savedCookie = fs.readFileSync(this.userCookiePath, 'utf-8')
            await this.ig.state.deserializeCookieJar(savedCookie)
        }
    }

    async searchLocation(place: string): Promise<IgLocation[]> {
        const result = await this.ig.search.places(place)
        return result.map(x => x.location)
    }

    async uploadAlbum(caption: string, localPaths: string[]): Promise<void> {
        const items = new Array<PostingAlbumPhotoItem>()

        for(const localPath of localPaths) {
            console.log(`reading file from: ${localPath}`)
            items.push({ file: await InstagramClient.prepareImage(localPath)})
        }

        try {
            const result = await this.ig.publish.album({
                caption: caption,
                items: items
            })
            console.log(`result: ${result}`)
        } catch (error) {
            console.error(`error: ${error.message}`)
        }
    }

    private static async prepareImage(path: string): Promise<Buffer> {
        return await sharp(path).resize({
            width: 1000,
            withoutEnlargement: true,
        }).toBuffer();
    }
}
