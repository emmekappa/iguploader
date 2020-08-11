import {IgApiClient} from "instagram-private-api";
import {IgLocation} from "../IgLocation";
import * as fs from "fs";
import * as os from "os"
import * as path from "path"
import {PostingAlbumPhotoItem} from "instagram-private-api/dist/types/posting.album.options";
import sharp from "sharp";

export class InstagramClient {
    private readonly username: string
    private readonly password: string
    private readonly ig: IgApiClient;
    private readonly userCookiePath = path.join(os.tmpdir(), ".igUploaderState.json")

    constructor({username, password}: { username: string; password: string }) {
        this.username = username
        this.password = password
        this.ig = new IgApiClient()
        this.ig.request.end$.subscribe(async () => {
            await this.saveState();
        });
        this.ig.state.generateDevice(this.username)
    }

    async login(force= false): Promise<void> {
        if(force) {
            await this.forceLogin()
            return
        }

        await this.reloadState()
        try {
            const currentUser = await this.ig.account.currentUser()
            if (!currentUser.username)
                throw new Error("not logged in")
            else
                console.log("State still looks valid")
        } catch (error) {
            console.log("State seems not valid trying to login again...")
            await this.forceLogin();
        }
    }

    private async forceLogin() {
        const response = await this.ig.account.login(this.username, this.password)
        console.log(`Username after login: ${response.username}`)
    }

    private async saveState(): Promise<void> {
        const serialized = await this.ig.state.serialize();
        delete serialized.constants; // this deletes the version info, so you'll always use the version provided by the library
        fs.writeFileSync(this.userCookiePath, JSON.stringify(serialized), 'utf-8')
    }

    private async reloadState(): Promise<void> {
        if (fs.existsSync(this.userCookiePath)) {
            const savedCookie = fs.readFileSync(this.userCookiePath, 'utf-8')
            await this.ig.state.deserialize(savedCookie)
        }
    }

    async searchLocation(place: string): Promise<IgLocation[]> {
        const result = await this.ig.search.places(place)
        return result.map(x => x.location)
    }

    async uploadAlbum(caption: string, localPaths: string[]): Promise<void> {
        const items = new Array<PostingAlbumPhotoItem>()

        for (const localPath of localPaths) {
            console.log(`reading file from: ${localPath}`)
            items.push({file: await InstagramClient.prepareImage(localPath)})
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
