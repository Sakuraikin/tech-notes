// VALIDATIONS

// User
const user = (user, res) => {
    if (!user) {
        return res.status(400).json({message: "user is required"})
    } else {
        return true
    }
}

// Title
const title = (title, res) => {
    if (!title) {
        return res.status(400).json({message: "title is required"})
    } else if (title?.length > 64) {
        return res.status(400).json({message: "title cannot be longer than 64 characters"})
    } else {
        return true
    }
}


// Body
const body = (body, res) => {
    if (!body) {
        return res.status(400).json({message: "Ticket body can't be blank"})
    } else if (body?.length < 12) {
        return res.status(400).json({message: "Ticket body must be at least 12 characters"})
    } else if (body?.length > 220) {
        return res.status(400).json({message: "Ticket body must be 220 characters or less"})
    }
    else {
        return true
    }
}


module.exports = {
    user,
    title,
    body
}