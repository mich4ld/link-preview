import { getUrls } from '../src';

describe('test fetching urls from text', () => {
    it ('should show set of urls', () => {
        const sampleText = 'Lorem ipsum dolor sit amet: https://github.com';
        const urls = getUrls(sampleText);
        expect(urls.has('https://github.com')).toBeTruthy();
    });

    it ('shoud show ip based urls in set', () => {
        const sampleText = 'Lorem ipsum dolor sit amet: http://193.207.11.64 example ip url';
        const urls = getUrls(sampleText);
        expect(urls.has('http://193.207.11.64')).toBeTruthy();
    })
});
