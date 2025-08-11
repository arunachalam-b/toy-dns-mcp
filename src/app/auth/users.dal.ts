export type User = {
    id: string;
    name: string;
    apiKey: string;
};

const users: User[] = [
    {
        id: "1",
        name: "John Doe",
        apiKey: "apikey-1",
    },
    {
        id: "2",
        name: "Jane Doe",
        apiKey: "apikey-2",
    },
];

export const getUsers = () => {
    return users;
};

export const getUserByApiKey = (apiKey: string) => {
    return users.find((user) => user.apiKey === apiKey);
};
