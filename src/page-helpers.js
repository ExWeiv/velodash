import { to, url } from 'wix-location-frontend';

export function refreshPage() {
    setTimeout(() => {
        to(url);
    }, 1)
}