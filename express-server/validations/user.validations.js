// VALIDATIONS

// Username
const username = (username, res) => {
    if (!username) {
        return res.status(400).json({message: "Username is required"})
    } else if (username?.length < 8) {
        return res.status(400).json({message: "Username must be at least 8 characters"})
    } else {
        return true
    }
}

// Password
const password = (password, res) => {
    if (!password) {
        return res.status(400).json({message: "Password is required"})
    } else if (password?.length < 12) {
        return res.status(400).json({message: "Password must be at least 12 characters"})
    } else {
        return true
    }
}

// Roles
// const roles = (roles, res) => {
//     if (!Array.isArray(roles)) {
//         return res.status(400).json({message: "Roles should be an array of strings"})
//     } else {
//         return true
//     }
// }

// isActive
const isActive = (isActive, res) => {
    if (typeof isActive !== 'boolean') {
        return res.status(400).json({message: "isActive must be a boolean value"})
    }
    else {
        return true
    }
}

// id
const id = (id, res) => {
    if (!id) {
        return res.status(400).json({message: "User ID is required"})
    } else {
        return true
    }
}
module.exports = {
    username,
    password,
    // roles,
    isActive,
    id
}