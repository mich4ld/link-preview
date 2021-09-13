import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

function createUaHeader(userAgentString?: string) {
    if (!userAgentString) {
        return;
    }

    return {
        'User-Agent': userAgentString,
    }
}

export class HttpClient {
    private readonly http: AxiosInstance;
    private rotateIndex = 0;

    constructor(
        private userAgents?: string[],
        axiosConfig?: AxiosRequestConfig,
    ) {
        this.http = axios.create(axiosConfig);
    }

    async fetch(url: string) {
        const userAgent = this.rotateUA()

        const response = await this.http.get(url, {
            headers: createUaHeader(userAgent),
            responseType: 'text',
        });

        return response.data;
    }

    private rotateUA(): string | undefined {
        if (!this.userAgents) {
            return;
        }

        if (!this.userAgents.length) {
            return;
        }

        if (this.rotateIndex === this.userAgents.length) {
            this.rotateIndex = 0;
        }

        const userAgent = this.userAgents[this.rotateIndex]
        this.rotateIndex++;

        return userAgent;
    }
}
