export const state = () => ({
    token: '',
    homeserver: '',
    username: '',
    password: '',
    current_room: '',
    rooms: [],
})

export const mutations = {
    change_token(state, token) {
        state.token = token
    },
    change_username(state, username,) {
        state.username = username
    },
    change_homeserver(state, homeserver,) {
        state.homeserver = homeserver
    },
    add_room(state, room) {
        state.rooms.push(room)
    }
}