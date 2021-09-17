import { LinkPreview } from '../src';

const linkPreview = new LinkPreview({});

describe('Test weird cases', () => {
    it ('Should return undefined for images', async () => {
        const url = 'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'
        const metadata = await linkPreview.getPreviewData(url);
        
        expect(metadata).toBe(undefined);
    })
})