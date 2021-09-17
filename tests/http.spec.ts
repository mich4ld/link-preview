import { HttpClient } from '../src/http';

const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
]

const http = new HttpClient(userAgents);

describe('User agent rotation tests', () => {
    it ('Should return different user agents', async () => {
        const url = 'https://ifconfig.me/ua';

        const res1 = await http.fetch(url);
        const res2 = await http.fetch(url);
        const res3 = await http.fetch(url);

        expect(res1).not.toEqual(res2);
        expect(res2).not.toEqual(res3);
        expect(res3).not.toEqual(res1);
    })
});

describe('Http response data format tests', () => {
    it ('[JSON] Should throw error', async () => {
        // testing with json api - string response expected
        const resPromise = http.fetch('https://jsonplaceholder.typicode.com/todos/1')
        await expect(resPromise).rejects.toThrow();
    });
})
