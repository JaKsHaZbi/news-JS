import Source from './source';

// no sense extends if you not use it
export default interface DataSources {
    sources: Array<Source>;
    status: string;
}
