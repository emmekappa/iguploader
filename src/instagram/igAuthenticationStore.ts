import ElectronStore from "electron-store";

interface InstagramAuthentication {
    username: string;
    password: string;
}

export const IgAuthenticationStore = new ElectronStore<InstagramAuthentication>({
    name: "instagram-auth",
    encryptionKey: "not-so-strong-encryption-key",
    defaults: {
        username: "",
        password: ""
    }
});
