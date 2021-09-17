import cheerio, { CheerioAPI } from 'cheerio';

export class WebScrapper {
    private readonly $: CheerioAPI;

    constructor(html: string) {
        this.$ = cheerio.load(html);
    }

    getData() {
        return {
            siteName: this.getSiteName(),
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

    private getSiteName() {
        return this.getMetaTags('site_name');
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
