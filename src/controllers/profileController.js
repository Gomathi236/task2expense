let getProfilePage = (req,res) =>{
    return res.render("profile.ejs",{
        user : req.user
        
    });
      
};


module.exports = {
    getProfilePage:getProfilePage
}