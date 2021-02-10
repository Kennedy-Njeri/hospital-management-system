const express = require('express')
const app = express()
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./db/mongoose')

const { notFound, errorHandler } = require('./middleware/errorMiddleware.js')




//import routes
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/testCat')
const testRoutes = require('./routes/test')
const treatmentRoutes = require('./routes/treatment')
const prescriptionRoutes = require('./routes/prescription')


require('dotenv').config()


// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());




// routes middleware

app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', testRoutes);
app.use('/api', treatmentRoutes);
app.use('/api', prescriptionRoutes);


app.use(notFound)
app.use(errorHandler)


const port = process.env.PORT || 8000



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})