import React from 'react';
const styleArgument={fontSize:'100px',color:'red'};

// const changeText = (event)=>{
//     console.log(event.target)
//     event.target.innerText = event.target.innerText +"被點了"
// }

let new_button = document.getElementById('root');
new_button.addEventListener('click', function(e) {
    if ( e.target.tagName === 'BUTTON' )
        e.target.textContent = e.target.textContent+"被點了";
});

const MultiButton=(num)=>{
    var output=[];
    for (let i=1;i<=num ; ++i)
        output.push(<button key={i}>第{i}個按鍵</button>)
    return output;
}

export default MultiButton;