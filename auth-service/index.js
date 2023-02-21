import express from 'express'
import mongoose from 'mongoose'
import userSchema from './model/user.js'
const app = express()



app.use(express.json())
app.post('/login', async (req, res) => {
    console.log('login ...');
    const { email, password, name } = req.body

    const userExist = await userSchema.findOne({ email: email })
    if (userExist) res.send('user is already exist')
    const user = await new userSchema(
        name,
        email,
        password,
    ).save()
    console.log({user});
    res.json({user})

})
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017/auth-service', () => {
    console.log('mongoose connected');
})

app.listen(5001, () => {
    console.log('server running in port 5001');
})