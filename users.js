
// new Date().toISOString() '2022-02-08T13:20:06.212Z'
let users = new Map();

const addUser = ({ id, name, room }) => {
    
    if (!room) { return { error: 'Room name is required!' } }
    if (!name) { return { error: 'User name is required!' } }

    name = name.trim();
    room = room.trim();

    if (!room) { return { error: 'Room name is required!' } }
    if (!name) { return { error: 'User name is required!' } }

    const user = { room, name, id }
    users[id] = user
    console.log(user)

    return { user };
}

const removeUser = (id) => {
    users.delete(id)
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

module.exports = { addUser, removeUser, getUser, getUsersInRoom }



