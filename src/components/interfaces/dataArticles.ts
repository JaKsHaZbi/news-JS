import Articles from './article';

export default interface Data {
    status: string;
    totalResults: number;
    articles: Array<Articles>;
    sources: Array<Articles>;
}
