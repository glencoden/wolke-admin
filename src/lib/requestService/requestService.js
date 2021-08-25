const rootUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost'
    : 'https://wolke.glencoden.de';

const oAuthUrl = `${rootUrl}/auth`;
const cardsUrl = `${rootUrl}/cards`;

function parseResponse(resp) {
    if (resp.ok) {
        return resp.json();
    }
    return resp.json().then(json => Promise.reject(json));
}

function encodeURI(data) {
    const formBody = [];
    for (const key in data) {
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(data[key]);
        formBody.push(`${encodedKey}=${encodedValue}`);
    }
    return formBody.join('&');
}


class RequestService {
    _oAuth2_access_token = '';

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

    _postEncodeURI(url, data) {
        return Promise.resolve()
            .then(() => encodeURI(data))
            .then(body => fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body
            }))
            .then(parseResponse);
    }

    isAuthenticated() {
        return !!this._oAuth2_access_token;
    }

    loginToWolke({ username, password }) {
        return this._postEncodeURI(`${oAuthUrl}/login`, { username, password, grant_type: 'password', client_id: null, client_secret: null });
    }

    registerOAuthUser({ username, password, admin_password }) {
        return this._post(`${oAuthUrl}/register`, { username, password, admin_password, grant_type: 'password' });
    }

    deleteOAuthUser({ username, admin_password }) {
        return this._post(`${oAuthUrl}/delete`, { username, admin_password, grant_type: 'password' }); // TODO do we need grant_type?
    }

    registerCardsUser({ name, isAdmin, from, to, admin_password }) {
        return this._post(`${cardsUrl}/upsert_user`, { name, isAdmin, from, to, admin_password });
    }
}

export const requestService = new RequestService();