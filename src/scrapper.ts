import cheerio, { CheerioAPI } from 'cheerio';

function getHostname(url: string) {
    try {
        const { hostname } = new URL(url);

        return hostname;
    } catch(err) {
        return;
    }
}

export class WebScrapper {
    private readonly $: CheerioAPI;

    constructor(html: string) {
        this.$ = cheerio.load(html);
    }

    getData(url: string) {
        return {
            url,
            siteName: this.getSiteName(url),
            title: this.getTitle(),
            description: this.getDescription(),
            type: this.getType(),
            image: this.getImage(),
        }
    }

    private getMetaTags(tagName: string) {
        return (
            this.$(`meta[property="og:${tagName}"]`).attr('content') ||
            this.$(`meta[name="${tagName}"]`).attr('content') ||
            this.$(`meta[property="twitter:${tagName}"]`).attr('content')
        )
    }

    private getHtmlTag(tagName: string) {
        return this.$(tagName).attr('content');
    }

    private getSiteName(url: string) {
        return this.getMetaTags('site_name') || getHostname(url);
    }

    private getTitle() {
        const tagName = 'title';
        return this.getMetaTags(tagName) || this.getHtmlTag(tagName);
    }

    private getDescription() {
        return this.getMetaTags('description')
    }

    private getType() {
        return this.getMetaTags('type') || 'website'
    }

    private getImage() {
        return this.getMetaTags('image')
    }
}