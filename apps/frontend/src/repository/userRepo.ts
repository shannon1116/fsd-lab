import type { User } from "../../../../shared/types/user";

type UsersResponseJSON = { message: string; data: User[] };

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const USER_ENDPOINT = "/users";

let usersData: User[] = [];

export async function getUsers(): Promise<User[]> {
    const userResponse: Response = await fetch(`${BASE_URL}${USER_ENDPOINT}`);

    if (!userResponse.ok) {
        throw new Error("Failed to fetch users");
    }

    const json: UsersResponseJSON = await userResponse.json();
    usersData = json.data; 
    return json.data;
}

export const addUser = async (userName: string): Promise<User[]> => {
    if (usersData.length === 0) {
        await getUsers(); // ensure data is loaded
    }

    const userIndex = usersData.findIndex(u => u.userName === userName);
    if (userIndex === -1) {
        throw new Error(`User ${userName} not found`);
    }

    const updatedUsers = [...usersData];
    updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
    };

    usersData = updatedUsers;
    return updatedUsers;
};