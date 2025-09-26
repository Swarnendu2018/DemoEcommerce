module.exports = function(requiredRole) {
    return(req,res,next)=>{
        // console.log(req.user);
        if(req.user.role!==requiredRole) {
            return res.status(403).json({message:"Access denied. Only "+ requiredRole +"s can perform the action"});
        }
        next();
    }
};