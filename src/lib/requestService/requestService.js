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
    _adminPassword = '';

    _get(url = `${rootUrl}/test/auth`) {
        const headers = {'Content-Type': 'application/json; charset=utf-8'};
        if (this._oAuth2_access_token) {
            headers.Authorization = `Bearer ${this._oAuth2_access_token}`;
        }
        return Promise.resolve()
            .then(() => fetch(url, {
                method: 'GET',
                headers
            }))
            .then(parseResponse);
    }

    _post(url, data) {
        const headers = {'Content-Type': 'application/json; charset=utf-8'};
        if (this._oAuth2_access_token) {
            headers.Authorization = `Bearer ${this._oAuth2_access_token}`;
        }
        return Promise.resolve()
            .then(() => JSON.stringify(data))
            .then(body => fetch(url, {
                method: 'POST',
                headers,
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
            }));
    }

    loginToWolke({ username, password }) {
        return this._postEncodeURI(`${oAuthUrl}/login`, { username, password, grant_type: 'password', client_id: null, client_secret: null })
            .then(resp => {
                if (resp.ok) {
                    this._oAuth2_access_token = resp.access_token;
                    this._adminPassword = password;
                }
                return resp;
            });
    }

    logout() {
        return new Promise(resolve => {
            this._oAuth2_access_token = '';
            this._adminPassword = '';
            resolve();
        });
    }

    getOAuthUsers() {
        return this._post(`${oAuthUrl}/get_all`, { admin_password: this._adminPassword });
    }

    registerOAuthUser({ username, password }) {
        return this._post(`${oAuthUrl}/register`, { username, password, admin_password: this._adminPassword, grant_type: 'password' });
    }

    deleteOAuthUser({ username }) {
        return this._post(`${oAuthUrl}/delete`, { username, admin_password: this._adminPassword, grant_type: 'password' }); // TODO do we need grant_type?
    }

    getCardsUsers() {
        return this._get(`${cardsUrl}/all_users`);
    }

    registerCardsUser({ name, isAdmin, from, to }) {
        return this._post(`${cardsUrl}/upsert_user`, { name, isAdmin, from, to, admin_password: this._adminPassword });
    }

    deleteCardsUser({ name }) {
        return this._post(`${cardsUrl}/delete_user`, { name, admin_password: this._adminPassword });
    }
}

export const requestService = new RequestService();