import React from 'react'
import './hw7.css'
function LogIn(){
    return(
        <div id="login">
            <h1>Login In</h1>
            <h3>hello!</h3>
            <form>
                <label type="text">使用者名稱</label>
                <br/>
                <input className='in' placeholder="account"/>
                <br/>
                <br/>
                <label type="text">密碼</label>
                <br/>
                <input className='in' type='password' placeholder="password"/>
                <br/>
                <button id="sigin">登入</button>
            </form>
        </div>
    );
}

export default LogIn;
