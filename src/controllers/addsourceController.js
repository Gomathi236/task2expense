import connection from "../configs/connectDB"
let getsourcePage = (req,res) =>{
    return res.render("addsource.ejs",{
        errors: req.flash("errors")
    })
    
}
let addSource = (req,res) =>{
    connection.query('SELECT * FROM income_type',function(err,type)     {
 
        if(err){
         req.flash('error', err); 
         res.render('income',{data:''});   
        }else{
            
            res.render('income',{data:type});
        }
                            
         });
        

 }


module.exports ={
    getsourcePage:getsourcePage,
    addSource:addSource
}