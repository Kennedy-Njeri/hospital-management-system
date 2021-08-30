const expenses = require('../models/expenses')
const asyncHandler  = require( 'express-async-handler')








exports.expenseById = asyncHandler (async (req, res, next, id) => {

    await expenses.findById(id).populate("department").exec((err, expense) => {
        if (err || !expense) {
            return res.status(400).json({
                error: ' Expense does not exist'
            });
        }
        req.expense = expense;
        next();
    });
})



exports.creatExpense = asyncHandler(async (req, res) => {
    //console.log(req.body)
    const expense = new expenses(req.body);
    await expense.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({ data });
    });
})


exports.update = asyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        const expense = await expenses.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        })

        if (!expense) {
            return res.status(404).send()
        }

        await expense.save()

        res.send(expense)

    } catch (e) {
        res.status(400).send(e)
    }

})


exports.getExpenseDetail = asyncHandler(async (req, res) => {

    const expense = await expenses.findById(req.params.id).populate("department")

    if (expense) {
        res.json({
            _id: expense._id,
            name: expense.name,
            department: expense.department._id,
            amount: expense.amount,
            description: expense.description,
            fromDate: expense.fromDate,
            to: expense.to,
            paid: expense.paid
        })
    } else {
        res.status(404)
        throw new Error('Expense not found')
    }
})


exports.remove = asyncHandler(async (req, res) => {

    const { id } = req.params

    const result = await expenses.findById(id)

    if (result) {
        await result.remove()
        res.json({ message: 'Expense removed' })
    } else {
        res.status(404)
        throw new Error('Expense not found')
    }

})


exports.list = asyncHandler(async (req, res) => {
    await expenses.find({}).populate("department").exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
})



exports.getPaidValues = (req, res) => {
    res.json(expenses.schema.path('paid').enumValues);
};