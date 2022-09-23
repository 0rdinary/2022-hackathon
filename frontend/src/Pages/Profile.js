import React from "react";

const profileData = [
    { name:'nickname', label:'닉네임'},
    { name:'pw', label:'패스워드'},
    { name:''}
];
function createData(nickname, pw) {
    return {nickname,pw  };
  }
  
  const Data = 
    createData('바른횟집','1557');

function Profile(){

    return(
        <div>
            <h1>프로필</h1>
            <h2>{Data.nickname}</h2>
            <h2>{Data.pw}</h2>
        </div>
    )
}

export default Profile;