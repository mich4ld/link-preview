import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { MAX_RESPONSE_SIZE } from "./constants";

export class HttpClient {
    private readonly http: AxiosInstance;
    private rotateIndex = 0;

    constructor(
        private userAgents?: string[],
        axiosConfig?: AxiosRequestConfig,
    ) {
        this.http = axios.create({
            maxContentLength: MAX_RESPONSE_SIZE,
            ...axiosConfig,
        });
    }

    async fetch(url: string) {
        const userAgent = this.rotateUA();

        const response = await this.http.get(url, {
            headers: this.createUaHeader(userAgent),
        });

        const contentType = response.headers['content-type'] || 'text/plain';
        if (!contentType.includes('text/html') && !contentType.includes('text/plain')) {
            throw Error('Invalid content type');
        }

        if (typeof response.data !== 'string') {
            throw Error('Response is not string');
        }

        return response.data;
    }

    private createUaHeader(userAgentString?: string) {
        if (!userAgentString) {
            return;
        }
    
        return {
            'User-Agent': userAgentString,
        }
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
