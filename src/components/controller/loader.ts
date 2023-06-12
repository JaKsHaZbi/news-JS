import DataSources from '../interfaces/dataSources';

interface Options {
    apiKey?: string;
    sources?: string;
}

const extractJson = <Data>(res: Response): Promise<Data> => res.json();

class Loader {
    baseLink: string;
    options: object;

    constructor(baseLink: string, options: Options) {
        // object is very abstract, use Options for example
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: Options },
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        // getNotNil
        const errNode: Element = document.querySelector('.news')!;
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                errNode.innerHTML = `Sorry, but there is ${res.status} error: ${res.statusText}`;
            }
            console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    // {} don't use it as type
    makeUrl(options: Options, endpoint: string) {
        // use Record instead
        const urlOptions: Record<string, string> = {
            ...this.options,
            ...options,
        };

        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            let hash: string = urlOptions[key];
            url += `${key}=${hash}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data?: DataSources) => void, options: Options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then<DataSources>(extractJson) // use utils
            .then(callback) // extra wrap
            .catch(console.error); // extra wrap
    }
}

export default Loader;
