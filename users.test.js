const { addUser, removeUser, getUser, getUsersInRoom, UsersSingleton } = require('./users')

describe('Users Test', () => {
    it('addUser -> successful', () => {
        addUser({ id: 123, name: 'hty', room: 'first' })
        addUser({ id: 1234, name: 'h1ty', room: 'first' })
        addUser({ id: 12334, name: 'h1ty', room: 'another room' })
        const res = getUsersInRoom('first');
        expect(res.length).toBe(2)
    })

    it('addUser -> users check', () => {
        const res = getUsersInRoom('another room')
        expect(res.length).toBe(1)
    })

    it('addUser -> got error without(or only whitespace) username or room name', () => {
        let res = addUser({ id: 3333, name: 'ty', room: ' ' })
        expect(res.error).toBe('Room name is required!')

        res = addUser({ id: 111, name: ' ', room: 'adsf' })
        expect(res.error).toBe('User name is required!')
    })

    it('addUser -> got error with duplicated ID',()=>{
        let res = addUser({ id: 123, name: 'ty', room: '11' })
        res = addUser({ id: 123, name: 'ty', room: '11' })
        expect(res.error).toBe('user ID already exists! (retry please)')
    })
    
    it('deleteUser -> successful',()=>{
        const singleton= UsersSingleton()
        
        singleton.addUser({ id: 123, name: 'ty', room: '11' })
        let res = singleton.getUser(123)
        expect(res).not.toBe(undefined)
        
        singleton.removeUser(123)
        res = singleton.getUser(123)
        expect(res).toBe(undefined)
    })

})

