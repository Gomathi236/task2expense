 import connection from "../configs/connectDB"
 let getIncomePage = (req,res) =>{
    return res.render("income.ejs");
 }
 let getSource = (req,res) =>{
    connection.query('SELECT * FROM income_type ',function(err,rows)     {
 
        if(err){
         req.flash('error', err); 
         res.render('income',{data:''});   
        }else{
            
            res.render('income',{data:type});
        }
                            
         });
        

 }

module.exports = {
    getIncomePage:getIncomePage,
    getSource:getSource
}