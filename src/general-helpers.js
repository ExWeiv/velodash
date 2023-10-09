import { warmupData, rendering } from 'wix-window-frontend';

/**
 * @template T
 * @function
 * @description Uses SSR when it's available. Read more here: https://shoonia.site/ssr-and-warmup-data/
 * @param {string} key - warmupData key.
 * @param {() => Promise<T>} func - Function you want to run with key.
 * @returns {Promise<T>}
 */
export async function ssrRendering(key, func) {
    if (rendering.env === 'backend') {
        const data = await func();

        warmupData.set(key, data);

        return data;
    }

    const data = warmupData.get(key);

    if (data) {
        return data;
    }

    return func();
}

/**
 * @function
 * @description Live caching system. Read more here: https://shoonia.site/cache-for-the-jsw-functions/
 * @param {(...arg: any[]) => Promise<any>} func
 * @param {number} maxAge - milliseconds of response store in cache
 */
export function cacheLive(func, maxAge = Infinity) {
    /** @type {Map<string, [number, any]>} */
    const cache = new Map();

    /** MemoFunc */
    const memoFunc = (...args) => {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            const [createdDate, response] = cache.get(key);
            const time = Date.now() - createdDate;

            if (time < maxAge) {
                return Promise.resolve(response);
            }

            cache.delete(key);
        }

        return func(...args).then((response) => {
            cache.set(key, [Date.now(), response]);
            return response;
        });
    };

    /** @memberof MemoFunc */
    memoFunc.cache = cache;
    return memoFunc;
}