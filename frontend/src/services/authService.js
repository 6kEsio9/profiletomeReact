const url = 'http://localhost:3030/users';

export const login = async (data) => {
    const request = await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await request.json();

    return result;
};

export const register = async (data) => {
    const request = await fetch(`${url}/register`, {
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await request.json();

    return result;
};

export const getOne = async (userId) => {
    const request = await fetch(`${url}/${userId}`);
    const result = await request.json();
    return result;
};

export const addFriends = async (userId, friendId) => {
    const request = await fetch(`http://localhost:3030/friend/${userId}/${friendId}`);
    const result = await request.text();
    return result;
};