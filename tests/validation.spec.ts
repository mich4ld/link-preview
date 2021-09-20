import { validate } from '../src/validator';

describe('Ignore IP adresses', () => {
    it('should reject all IP adresses', () => {
        const ips = [
            'http://127.0.0.1:3000',
            'http://170.160.169.106:2137',
            'http://202.3.53.201:200',
            'http://68.117.193.89:80',
            'http://193.207.11.64',
            'http://149.95.104.242',
            'http://232.143.113.28',
            'http://159.250.210.69',
            'http://129.65.93.14',
            'http://69.17.242.197',
            'http://59.249.191.154',
            'http://[::1]'
        ]

        ips.forEach(ip => {
            const isValid = validate(ip);
            //console.log(ip, isValid);
            expect(isValid).toBeFalsy();
        });
    });
});

describe('URL validation', () => {
    it('should accept all legit urls', () => {
        const legitUrls = [
            'https://en.wikipedia.org/wiki/Linux',
            'https://www.youtube.com/watch?v=5nl7sKwPQo4',
            'https://www.npmjs.com/package/@mich4l/discord-base',
            'https://github.com/mich4ld',
        ]

        legitUrls.forEach(url => {
            const isValid = validate(url);
            //console.log(url, isValid);
            expect(isValid).toBeTruthy();
        })
    });

    it('shoud reject all invalid urls', () => {
        const invalidUrls = [
            'h:/E#Jhd',
            'htp:/lol.com',
            'postgres://localhost:5432',
            'htpps://domain.me',
        ]

        invalidUrls.forEach(url => {
            const isValid = validate(url);
            //console.log(url, isValid);
            expect(isValid).toBeFalsy();
        })
    });

    it('should reject localhost', () => {
        const isValid = validate('http://localhost:2137/hello');
        expect(isValid).toBeFalsy();
    });
})