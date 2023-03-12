import express from 'express'
import mongoose from 'mongoose'
import userSchema from './model/user.js'
const app = express()

app.use(express.json())

// login api
app.post('/signup', async (req, res) => {
    console.log('signup ...');
    const { email, password, name } = req.body

    const userExist = await userSchema.findOne({ email: email })
    if (userExist) res.send('user is already exist')
    const user = await new userSchema({
        name,
        email,
        password,
    }).save().catch(err => {
        console.error(err);
    })
    console.log({ user });
    res.json({ user })

})

// login
app.post('/login', async (req, res) => {

    try {
        console.log('login ...');
        const { email, password } = req.body

        const userExist = await userSchema.findOne({ email: email }).lean()
        if (!userExist) throw ('user is didnt exist')
        if (password !== userExist.password) throw ('password is incorrect')
        console.log({ userExist });
        return res.json({ userExist })
    } catch (error) {
        return res.status(500).send(error.toString())
        
    }


})
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://ajnash:ajnash.aju323@cluster0.ygoojqc.mongodb.net/auth?retryWrites=true&w=majority', () => {
    console.log('mongoose connected');
})

app.listen(5001, () => {
    console.log('server running in port 5001');
})