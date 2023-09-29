class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    _getResponse(response) {
        if(response.ok){
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
    }

    getProfileInformation() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        })
        .then(this._getResponse)
    }

    getAllCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
        })
        .then(this._getResponse)
    }

    changeProfileInformation(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            }),
        })
        .then(this._getResponse)
    }

    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._getResponse)
    }

    changeAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
        body: JSON.stringify(avatar)
        })
        .then(this._getResponse)
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._getResponse)
    }

    like(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._getResponse)
    }

    unlike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._getResponse)
    }

}

export default Api;