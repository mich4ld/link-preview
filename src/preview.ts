import { AxiosRequestConfig } from "axios";
import { HttpClient } from "./http";
import { WebScrapper } from "./scrapper";

export interface IConfig {
    axios?: AxiosRequestConfig;
    userAgents?: string[];
}

export class LinkPreview {
    private readonly http: HttpClient;

    constructor({ axios, userAgents }: IConfig) {
        this.http = new HttpClient(userAgents, axios);
    }

    async getPreviewData(url: string) {
        try {
            const html = await this.http.fetch(url);
            const scrapper = new WebScrapper(html);
            return scrapper.getData(url);
        }
        catch (err) {
            return;
        }
    }
}
