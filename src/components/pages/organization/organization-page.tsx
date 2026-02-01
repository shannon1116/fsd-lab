import type { Friends } from "../../../types/friends";
import FriendsList from "../../friends/friends_list/friends_list";

function Organization(
    {
        friends
    }:
    {
        friends: Friends[]
    }
) {
    return(
        <>
        <main>
        <h2>Leadership and Management</h2>
        <FriendsList />
        </main>
        </>
    )
}

export default Organization