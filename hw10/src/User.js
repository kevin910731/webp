import React, { Component } from "react";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

class User extends Component{
    constructor(props){
        super(props);
        this.state={
            name: null,
            login:null,
            location:null,
            id:null,
            blog:null,
            followers:null
        }
    }
    
    componentDidMount(){
        fetch("https://api.github.com/users/cjwu",{method:"GET"})
        .then(res =>res.json())
        .then(data =>{
            // console.log(data)
            this.setState({name:data.name})
            this.setState({login:data.login})
            this.setState({location:data.location})
            this.setState({id:data.id})
            this.setState({blog:data.blog})
            this.setState({followers:data.followers})
        })
        .catch(e =>{
            console.log("error")
        })
    }

    render(){
        return(
            <div style={{textAlign:'center'}}>
                <br/>
                <br/>
                <Avatar
                    src="https://avatars.githubusercontent.com/u/1336309?v=4"
                    alt="Remy Sharp"
                    sx={{ width: 150, height: 150 }}
                    style={{margin:"auto"}}
                />
                <div >
                    <h1>{this.state.name}</h1>
                    <h2>{this.state.login}</h2>
                </div>
                <div >
                    <h3><AccessibilityIcon /> id: {this.state.id}</h3>
                    <h3><PeopleAltIcon /> follower: {this.state.followers}</h3>
                    <h3><LocationOnIcon />{this.state.location}</h3>
                    <h3><LinkIcon />{this.state.blog}</h3>
                </div>
            </div>
        )
    }
}

export default User
