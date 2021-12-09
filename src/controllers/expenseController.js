let getExpensePage = (req,res) =>{
    return res.render("expenses.ejs",{
        budget: budget,
        name : name
    });
};

module.exports = {
    getExpensePage:getExpensePage
}