const KEY = 'loggeinUser'

export const userService = {
    getLoggedinUser,
    withdrawBalance
}

function getLoggedinUser() {
    if (!localStorage.getItem(KEY)) {
        const user = { _id: 'u101', fullname: 'Baba Ji', balance: 1000 }
        _saveUserToStorage(user);
    }
    return JSON.parse(localStorage.getItem(KEY))
}

function withdrawBalance(amount) {
    const user = getLoggedinUser()
    if (user.balance < amount) return Promise.reject('Not enough balanace')
    user.balance -= amount
    _saveUserToStorage(user);
    return Promise.resolve(user.balance)
}

function _saveUserToStorage(user) {
    localStorage.setItem(KEY, JSON.stringify(user))
}