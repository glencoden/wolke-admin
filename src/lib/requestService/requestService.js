const rootUrl = process.env.NODE_ENV === 'development'
    ? 'http://192.168.1.3:80'
    : 'https://wolke.glencoden.de';

const oAuthUrl = `${rootUrl}/auth`;
const cardsUrl = `${rootUrl}/cards`;

function parseResponse(resp) {
    if (resp.ok) {
        return resp.json();
    }
    return resp.json().then(json => Promise.reject(json));
}


class RequestService {
    _get(url) {
        return fetch(url).then(parseResponse);
    }

    _post(url, data) {
        return Promise.resolve()
            .then(() => JSON.stringify(data))
            .then(body => fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                body
            }))
            .then(parseResponse);
    }

    registerOAuthUser() {
        return this._post(`${oAuthUrl}/register`, {});
    }

    registerCardsUser() {
        return this._post(`${cardsUrl}/register`, {});
    }
}

export const requestService = new RequestService();