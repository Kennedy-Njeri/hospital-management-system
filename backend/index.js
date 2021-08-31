const express = require('express')
const app = express()
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const xss = require('xss-clean');
const rateLimit = require("express-rate-limit");
const hpp = require('hpp');
require('./db/mongoose')
const path = require('path')

const { notFound, errorHandler } = require('./middleware/errorMiddleware.js')




//import routes
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/testCat')
const testRoutes = require('./routes/test')
const treatmentRoutes = require('./routes/treatment')
const prescriptionRoutes = require('./routes/prescription')
const patientDetailsRoutes = require('./routes/patientDetails')
const uploadRoutes = require('./routes/uploadRoutes')
const buildingRoutes = require('./routes/building')
const floorRoutes = require('./routes/floor')
const uploadExelRoutes = require('./routes/uploadExel')
const departRoutes = require('./routes/department')
const specializeRoutes = require('./routes/specialization')
const designateRoutes = require('./routes/designation')
const doctorsDetailsRoutes = require('./routes/doctorsDetails')
const vendorsRoutes = require('./routes/vendors')
const expensesRoutes = require('./routes/expenses')
const medicineRoutes = require('./routes/medicine')
const vaccineCatRoutes = require('./routes/vaccineCat')
const vaccineAppRoutes = require('./routes/vaccineAppointment')
const consulCatAppRoutes = require('./routes/conslCat')
const consultationAppRoutes = require('./routes/consultation')

require('dotenv').config()


// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
// Sanitize data
app.use(mongoSanitize());
// Set security headers
app.use(helmet());
// Prevent XSS attacks
app.use(xss());
// Prevent http param pollution
app.use(hpp());
// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 300
});
app.use(limiter);



// app.use(function(req, res, next) { //allow cross origin requests
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
//     res.header("Access-Control-Max-Age", "3600");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
//     next();
// });

// routes middleware

app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', testRoutes);
app.use('/api', treatmentRoutes);
app.use('/api', prescriptionRoutes);
app.use('/api', patientDetailsRoutes);
app.use('/upload', uploadRoutes)
app.use('/api', buildingRoutes)
app.use('/api', floorRoutes)
app.use('/api', departRoutes)
app.use('/api', specializeRoutes)
app.use('/api', designateRoutes)
app.use('/api', doctorsDetailsRoutes)
app.use('/api', vendorsRoutes)
app.use('/api', expensesRoutes)
app.use('/api', medicineRoutes)
app.use('/api', vaccineCatRoutes)
app.use('/api', vaccineAppRoutes)
app.use('/api', consulCatAppRoutes)
app.use('/api', consultationAppRoutes)
app.use('/uploadfile', uploadExelRoutes)


//const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))

app.use(notFound)
app.use(errorHandler)


const port = process.env.PORT || 8000




app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})