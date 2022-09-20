
const followLogic = (followers,followings)=>{
    const r = [];
    for(let i=0;i<followers.length;i++){
        for(let j=0;j<followings.length;j++){
            console.log()
            if(followers[i].user.username === followings[j].user.username)
            {
                followers[i].user["following"]= true;
            }
        }
        r.push(followers[i])
    }
    return r;
}
export default followLogic