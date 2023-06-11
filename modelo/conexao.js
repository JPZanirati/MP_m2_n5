const mongoose = require('mongoose');

const banco = mongoose.connect('mongodb+srv://JPZanirati:UdAQxHWQqMThvfm3@cluster0.twezyrm.mongodb.net/livraria', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { console.log("deu bom") }).catch((err) => { console.log("deu ruim", err) })

module.exports = mongoose;