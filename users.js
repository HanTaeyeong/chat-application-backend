
// new Date().toISOString() '2022-02-08T13:20:06.212Z'

const UsersSingleton = () => {

    let users = new Map();

    const addUser = ({ id, name, room }) => {

        if (getUser(id)) { return { error: 'user ID already exists! (retry please)' } }

        if (!room) { return { error: 'Room name is required!' } }
        if (!name) { return { error: 'User name is required!' } }

        name = name.trim();
        room = room.trim();

        if (!room) { return { error: 'Room name is required!' } }
        if (!name) { return { error: 'User name is required!' } }

        const user = { room, name, id }

        users.set(id, user)

        return { user };
    }

    const removeUser = (id) => users.delete(id)

    const getUser = (id) => users.get(id)

    const getUsersInRoom = (room) => {
        const res = []

        for (const [id, user] of users.entries()) {
            if (user.room === room) {
                res.push(user)
            }
        }
        return res;
    }
    return { addUser, removeUser, getUser, getUsersInRoom }
}

const singletonInstance = UsersSingleton()

module.exports = { ...singletonInstance, UsersSingleton }



