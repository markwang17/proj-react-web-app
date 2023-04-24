import axios from "axios";
// const USERS_URL = "http://localhost:4000/api/users";
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_URL = `${API_BASE}/users`;

const api = axios.create({
    withCredentials: true,
});

export const findUserById = async (userId) => {
    const response = await api.get(`${USERS_URL}/${userId}`);
    const user = response.data;
    return user;
};

export const findAllUsers = async () => {
    const response = await api.get(USERS_URL);
    const users = response.data;
    return users;
};

export const createUser = async (user) => {
    const response = await api.post(USERS_URL, user);
    const userCreated = response.data;
    return userCreated;
};

export const deleteUser = async (userId) => {
    const response = await api.delete(`${USERS_URL}/${userId}`);
    const status = response.data;
    return status;
};

export const updateUser = async (user) => {
    const response = await api.put(`${USERS_URL}/${user._id}`, user);
    const status = response.data;
    return status;
};

export const login = async ({ username, password }) => {
    const response = await api.post(`${USERS_URL}/login`, {
        username,
        password,
    });
    if (response.status === 200) {
        const user = response.data;
        return user;
    } else if (response.status === 403) {
        throw new Error("your account is being blocked");
    } else {
        throw new Error("login failed");
    }
};

export const logout = async () => {
    const response = await api.post(`${USERS_URL}/logout`);
    const status = response.data;
    return status;
};

export const profile = async () => {
    const response = await api.post(`${USERS_URL}/profile`);
    const user = response.data;
    return user;
};

export const register = async ({username, password, firstName, lastName, dob, email, role}) => {
    const response = await api.post(`${USERS_URL}/register`, {
        username,
        password,firstName, lastName, dob, email, role
    });
    if (response.status === 200) {
        const user = response.data;
        return user;
    } else {
        throw new Error("register failed");
    }
};

export const follow = async (userId1, userId2) => {
    const response = await api.post(`${USERS_URL}/follow/${userId1}/${userId2}`);
    return response.data;
}

export const isFollow = async (userId1, userId2) => {
    const response = await api.get(`${USERS_URL}/follow/${userId1}/${userId2}`);
    return response.data;
}

export const unfollow = async (userId1, userId2) => {
    const response = await api.delete(`${USERS_URL}/follow/${userId1}/${userId2}`);
    return response.data;
}

export const addBookmark = async (mid, mpp) => {
    const response = await api.post(`${USERS_URL}/bookmark`, {movieId:mid, movieCover:mpp});
    return response.data;
}
export const removeBookmark = async (mid) => {
    const response = await api.delete(`${USERS_URL}/bookmark/${mid}`);
    return response.data;
}