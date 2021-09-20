import { isIP } from 'net';
import { LOCAL_ADRESSES } from './constants';

interface IValidationOptions {
    protocols: string[],
    preventIPs: boolean;
}

const defaultOptions: IValidationOptions = {
    protocols: ['http:', "https:"],
    preventIPs: true,
}


function preventIP(hostname: string) {
    if (hostname.startsWith('[')) {
        return false;
    }

    const result = isIP(hostname);
    if (!result) {
        return true;
    }

    return false;
}

export function validate(url: string, options: IValidationOptions = defaultOptions) {
    try {
        const { origin, host, hostname, protocol } = new URL(url);
        if (origin === 'null' || host === '' || hostname === '') {
            return false;
        }

        if (!options.protocols.includes(protocol)) {
            return false;
        }

        if(LOCAL_ADRESSES.includes(hostname)) {
            return false;
        }

        if (options.preventIPs) {
            const isNotIp = preventIP(hostname);
            if (!isNotIp) {
                return false;
            }
        }

        return true;

    } catch (err: unknown) {
        return false;
    }
}
