import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://rss-news-api.onrender.com/', {   // https://newsapi.org/v2/
            apiKey: 'bf5dbde6b69a4b5abd87d3345fdaf8e9', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
