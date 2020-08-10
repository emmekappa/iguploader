import {IgApiClient} from "instagram-private-api";

export class InstagramClient {
    private readonly username: string
    private readonly password: string
    private ig: IgApiClient;

    constructor(username: string, password: string) {
        this.username = username
        this.password = password
        this.ig = new IgApiClient()
    }

    async login() {
        this.ig.state.generateDevice(this.username)
        await this.ig.account.login(this.username, this.password)
    }

    async searchLocation(place: string) : Promise<string[]> {
        const result = await this.ig.search.places(place)
        return result.map(x => x.location.name)
    }
}
