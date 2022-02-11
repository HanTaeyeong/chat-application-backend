
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
        users[id] = user

        return { user };
    }

    const removeUser = (id) => {
        users[id]=undefined
    }

    const getUser = (id) => users[id]

    const getUsersInRoom = (room) => {
        const res = []

        for (const id in users) {

            const user = users[id]

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



