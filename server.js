const express = require('express')
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose')
// const adminRouter = require('./routes/admin')
const fs = require('fs');
const myCss = {
    style: fs.readFileSync('./public/assets/style.css', 'utf8')
}
const Article = require('./models/article')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs');





app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))



app.get('/', async(req, res) => {
   const articles = await Article.find().sort({ createdAt: 'desc'})
    res.render('articles/index', { articles: articles, myCss: myCss } )
})

app.get('/admin', async(req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc'})
    res.render('admin', { articles: articles, myCss: myCss } )
})

app.use('/articles', articleRouter)

app.listen(5000)