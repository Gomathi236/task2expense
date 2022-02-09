let getExpensePage = (req,res) =>{
    return res.render("expenses.ejs",{
        budget: budget,
        name : category
    });
};
let addExpense = (req,res) =>{
    connection.query('SELECT * FROM expense_type',function(err,type)     {
 
        if(err){
         req.flash('error', err); 
         res.render('expenses',{data:''});   
        }else{
            
            res.render('expenses',{data:type});
        }
                            
         });
        

 }

module.exports = {
    getExpensePage:getExpensePage,
    addExpense:addExpense
}