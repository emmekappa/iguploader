import ElectronStore from "electron-store";

export interface Credentials {
  username: string;
  password: string;
}

export class CredentialsStore {
  private store: ElectronStore<Credentials>;

  constructor() {
    this.store = new ElectronStore<Credentials>({
      name: "instagram-auth",
      encryptionKey: "not-so-strong-encryption-key",
      defaults: {
        username: "",
        password: "",
      },
    });
  }

  public get(): Credentials | undefined {
    const username: string | undefined = this.store.get("username");
    const password: string | undefined = this.store.get("password");
    if (username !== undefined && password !== undefined) {
      return { username, password };
    }
    return undefined;
  }

  public set(credentials: Credentials): void {
    this.store.set("username", credentials.username);
    this.store.set("password", credentials.password);
  }

  public clear(): void {
    this.store.clear();
  }
}
