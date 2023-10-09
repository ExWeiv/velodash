/**
 * @function
 * @description Returns a usable HTTP URL from Wix Media 
 * @param {string} imageUrl
 * @returns {{url: string, width: number, height: number, _id: string}}
 */
export function convertWixMediaString(imageUrl) {
    const urlMatch = imageUrl.match(/wix:image:\/\/v1\/([^#]+)/);
    if (!urlMatch) {
        throw new Error('Invalid input string');
    }
    const imageUrlPart = urlMatch[1];

    const sizeMatch = imageUrl.match(/#originWidth=(\d+)&originHeight=(\d+)/);
    if (!sizeMatch) {
        throw new Error('Invalid input string');
    }
    const width = parseInt(sizeMatch[1]);
    const height = parseInt(sizeMatch[2]);

    const idMatch = imageUrlPart.match(/([^/]+)\/[^/]+$/);
    if (!idMatch) {
        throw new Error('Invalid URL part in the input string');
    }
    const _id = idMatch[1];

    const result = {
        url: `https://static.wixstatic.com/media/${_id}`,
        width,
        height,
        _id,
    };

    return result;
}