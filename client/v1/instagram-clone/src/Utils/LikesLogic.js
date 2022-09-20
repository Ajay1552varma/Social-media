const LikeButtonLogic = (likesArray,userId)=>{
    let flag = false;
    if(likesArray.length>0){
        for (let i = 0; i < likesArray.length; i++) {
            if(likesArray[i].author._id == userId)
                flag = true;        
        }
    }
    return flag
}

export default LikeButtonLogic;