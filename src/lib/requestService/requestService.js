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