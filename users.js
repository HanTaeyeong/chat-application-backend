let users = []

const addUser = ({ id, name, room }) => {

    if(!name || !room){
        return {error:'do not contained name or room!'}
    }

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if (existingUser) {
        return { error: 'Username already exists!' }
    }
    const user = { id, name, room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    return users = users.filter(user => user.id !== id)
}

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room)


module.exports = { addUser, removeUser, getUser, getUsersInRoom }



