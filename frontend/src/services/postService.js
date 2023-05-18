const url = 'http://localhost:3030/posts';

exports.getAll = () => {
    return fetch(url)
        .then((res) => res.json())
};

exports.create = ({ imageUrl, caption }, authToken) => {
    return fetch(`${url}/create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': authToken
        },
        body: JSON.stringify({ imageUrl, caption })
    })
        .then((res) => res.text())
};

exports.edit = (data, id, authToken) => {
    return fetch(`${url}/edit/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': authToken
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
};

exports.getOne = (postId) => {
    return fetch(`${url}/${postId}`)
        .then((res) => res.json())
};

exports.delete = (postId, authToken) => {
    return fetch(`${url}/delete/${postId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'X-Authentication': authToken
        }
    })
        .then(res => res.json())
};

exports.like = (userId, postId, authToken) => {
    return fetch(`${url}/like/${userId}/${postId}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'X-Authentication': authToken
        }
    })
        .then(res => res.json())
};