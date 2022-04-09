import React,{Component} from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import { FormControl, Tab, Typography } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Tabs from '@mui/material/Tabs'
import { Box } from '@mui/system';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
class Header extends Component{
    constructor(){
        super();
        this.state = {
            isLoggedIn:false,
            modalOpen : false,
            buttonState : "Login",
            tabState:0,
            UName:"",
            Pwd:"",
            emaiaddr:"",
            FName:"",
            LName:"",
            MNumber:"",
            ConPwd:"",
            isDiffPass:true
        };
    }

    checkPassword(){

        if(this.state.Pwd === this.state.ConPwd){
            this.setState({
                isDiffPass:false,
            })
        }else if(this.state.Pwd !== this.state.ConPwd){
            this.setState({
                isDiffPass:true,
            })
        }
    }

    loginRegister(e, value, buttonState){
        if(buttonState == 'login'){
                const response = fetch('/api/v1/auth/' + buttonState,{
                    method:'POST',
                    headers:{
                        "Accept": "application/json;charset=UTF-8",
                        "authorization": "Basic "+window.btoa(value)
                    }
                }
            ).then(response => response.json())
            .then(data => {
                if(data.id !== null && data.role.id!==null){
                    this.setState({buttonState:"Logout"});
                }
            });
        }else if(buttonState == 'signup'){
                const response = fetch('/api/v1/' + buttonState,{
                    method:'POST',
                    headers:{
                        "Accept": "application/json;charset=UTF-8",
                        'Content-Type': 'application/json' 
                    },
                    body:JSON.stringify({
                        "email_address": this.state.emaiaddr,
                        "first_name": this.state.FName,
                        "last_name": this.state.LName,
                        "mobile_number": this.state.MNumber,
                        "password": this.state.Pwd
                    } )        
                }
            ).then(response => response.json())
        }

    }    
    render(){
        return(
            <div>
            <div class="Header">
                <img src={logo} alt="Logo Not Available"></img>
                <Button id="btn-logging" variant="contained" color="default" onClick={()=>{this.setState({modalOpen:true})}} >{this.state.buttonState}</Button>
                {/* <Button id="btn-bookshow" variant="contained" color="primary" >Book Show</Button> */}
            </div>
            <Modal 
                isOpen={this.state.modalOpen}
                contentLabel="Login"
                class="Login-register-modal"
                style={customStyles}
                onRequestClose={() => {this.setState({modalOpen:false})}}
                >
                        <Box>
                            <Tabs value={this.state.tabState} onChange = {(e,value)=>{this.setState({tabState:value})}}>
                                <Tab label="Login" ></Tab>
                                <Tab label="Register" ></Tab>
                            </Tabs>
                        </Box>


                        {this.state.tabState === 0 && 
                                                    <Typography component="div" class="input-fields">
                                                        <InputLabel>User Name</InputLabel>
                                                        <Input
                                                            id="UsrName"
                                                            type="email"
                                                            value={this.state.UName}
                                                            validators={['required','isEmail']}
                                                            onChange={(e)=>{this.setState({UName:e.target.value})}}
                                                            errormessages={['UserName is required','Enter a valid email id']}
                                                            >
                                                        </Input>
                                                        <InputLabel>Password</InputLabel>
                                                        <Input
                                                            id="pswrd"
                                                            type="password"
                                                            value={this.state.Pwd}
                                                            onChange={(e)=>{this.setState({Pwd:e.target.value})}}
                                                            validators={['required','isEmail']}
                                                            errormessages={['UserName is required','Enter a valid email id']}
                                                            >
                                                        </Input>  
                                                        <Button id="btn-logging" variant="contained" color="default" onClick={(e, value)=>{this.loginRegister(e, this.state.UName+':'+this.state.Pwd, 'login')}} >Login</Button>                                              
                                                    </Typography>
                        }
                        {this.state.tabState === 1 && 
                                                    <Typography component="div" class="input-fields">
                                                        <InputLabel>Email</InputLabel>
                                                        <Input
                                                            id="emailid"
                                                            type="email"
                                                            name="email_address"
                                                            value={this.state.emaiaddr}
                                                            validators={['required','isEmail']}
                                                            onChange={(e)=>{this.setState({emaiaddr:e.target.value})}}
                                                            errormessages={['UserName is required','Enter a valid email id']}
                                                            >
                                                        </Input>                                                        
                                                        <InputLabel>First Name</InputLabel>
                                                        <Input
                                                            id="FName"
                                                            type="text"
                                                            name="first_name"
                                                            value={this.state.FName}
                                                            validators={['required']}
                                                            onChange={(e)=>{this.setState({FName:e.target.value})}}
                                                            errormessages={['First name is required']}
                                                            >
                                                        </Input> 
                                                        <InputLabel>Last Name</InputLabel>
                                                        <Input
                                                            id="LName"
                                                            type="text"
                                                            name="last_name"
                                                            value={this.state.LName}
                                                            validators={['required']}
                                                            onChange={(e)=>{this.setState({LName:e.target.value})}}
                                                            errormessages={['LastName is required']}
                                                            >
                                                        </Input>    
                                                        <InputLabel>Mobile Number</InputLabel>
                                                        <Input
                                                            id="MNumber"
                                                            type="text"
                                                            name="mobile_number"
                                                            value={this.state.MNumber}
                                                            validators={['required']}
                                                            onChange={(e)=>{this.setState({MNumber:e.target.value})}}
                                                            errormessages={['Mobile Number is required']}
                                                            >
                                                        </Input>                                                                                                                                                                    
                                                        <InputLabel>Password</InputLabel>
                                                        <Input
                                                            id="pswrd"
                                                            type="password"
                                                            name="password"
                                                            value={this.state.Pwd}
                                                            onChange={(e) => {this.setState({Pwd:e.target.value})}}
                                                            onKeyUp={(e) => {this.checkPassword();}}
                                                            validators={['required']}
                                                            errormessages={['Password']}
                                                            >
                                                        </Input>   
                                                        <Button id="btn-logging" variant="contained" color="default"  onClick={(e, value)=>{this.loginRegister(e, value, 'signup')}} >Register</Button>                                                                                                      
                                                    </Typography>
                        }                        
                </Modal>            
            </div>

        );
    }
    

}

export default Header;