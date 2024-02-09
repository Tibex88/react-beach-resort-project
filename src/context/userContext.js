import React, { Component } from "react";

import { useContext } from 'react';
import { APIErrorContext } from "../context/errorContext";

// import { NavigationContext } from './navigationContext';
import { withRouter } from "react-router";
import axios from "axios";

// require("dotenv").config();


const UserContext = React.createContext();

export default class UserProviderWoutRouter extends Component {  
  static contextType = APIErrorContext;

  state = {
    users:[],
    me:{},
    loading: false,
    isLoggedIn:false,
    auth: false,
  };
  setToken = (token) =>{
    localStorage.setItem("token",token)
    this.setState({
      auth : "Bearer " + token,
    })
  }
  remToken = () =>{
    localStorage.setItem("token",null)
    this.setState({
      auth :null,
    })
  }
  getData = async () => {
    try {

      let response = await axios({
          method: "get",
          url:
          "http://localhost:27000/users/me",
            // `/?${search}&${filter}&page=${page}&limit=16&fields=title,shortDescription,media.thumbnail`,
          headers: {
            Authorization:this.state.auth,
          },
      })
    //   let allusers = await axios({
    //     method: "get",
    //     url:
    //     "http://localhost:27000/users",
    //       // `/?${search}&${filter}&page=${page}&limit=16&fields=title,shortDescription,media.thumbnail`,
    //     headers: {
    //       Authorization:this.state.auth,
    //     },
    // })

      // let users =  allusers.data.data.data
      let me = response.data.data.data[0];
      console.log({me})

      this.setState({
        // users,
        me,
      })

    } catch (error) {
      const {status, message} = error.response.data
      console.log({status, message})
      const { addError } = this.context
      addError(message, status)

    }
  };
  login = async (event) => {
    try{
      console.log("logging in...")
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      let response = await axios({
        method: "post",
        data:{
          email:form.get('email'), password:form.get('password')
        },
        url:"http://localhost:27000/users/login",
      })
      
      const {token, data} =(response.data)
      
      this.setState({
        me: data.user,
        auth: "Bearer " + token,
        isLoggedIn:true
      })

    await this.getData();
    await this.getUsers();

    const { history } = this.props;
    history.replace('/');

      return true;
    }
    catch(error){
      const {status, message} = error.response.data
      console.log({status, message})
      const { addError } = this.context
      addError(message, status)

    }
  };
  logout = async () => {
    
    try{
    
      await axios({
        method: "get",
        url:
        "http://localhost:27000/users/logout",
    })
    
    console.log("logging out...")
      
    this.setState({
    auth:false,
    isLoggedIn:false,
    me:{},
    })
    const { history } = this.props;
    history.push('/signin');
    // history.replace('/signin', 
    // )
    // this.setState({
    // //   auth:null,
    // //   isLoggedIn:false
    // //   })
    //   );


      return true;
    }
    catch(error){
      const {status, message} = error.response.data
      console.log({status, message})
      const { addError } = this.context
      addError(message, status)

    }
  };
  forgotPwd = async (event) =>{
    try{
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      console.log(form.get('email'))
      console.log("forgot pwd...")
    await axios({
        method: "post",
        url:"http://localhost:27000/users/forgotPassword",
        data:{
          email:form.get('email')
        }
    })

    }catch(error){
      console.log(error)
      // const {status, message} = error.data
      // console.log({status, message})
      // const { addError } = this.context
      // addError(message, status)

    }
  };
  resetPwd = async (event,params)=>{
    try{

      console.log({event})
      console.log(params.token)
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      let response = await axios({
          method: "post",
          url:`http://localhost:27000/users/resetPassword/${params.token}`,
          data:{
            password:form.get('password'), confirmPassword:form.get('confirmPassword')
          }
      })
      
      console.log("reset pwd...")
      const {token, data} =(response.data)
      
      this.setState({
        me: data.user,
        auth: "Bearer " + token,
        isLoggedIn:true
      })

    await this.getData();
    await this.getUsers();


    // console.log({auth:this.state.auth})
    // const history = useHistory();
    // const { history } = this.props;
    // history.replace('/');

        
      const { history } = this.props;
      history.push('');
  
      }catch(error){
        const {status, message} = error.response.data
        console.log({status, message})
        const { addError } = this.context
        addError(message, status)
  
      }
  };
  signup = async (event) => {
    
    try{
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      console.log(form)
      let response = await axios({
        method: "post",
        data:{
          firstName:form.get('firstName'),
          lastName:form.get('lastName'),
          role:"user",
          email:form.get('email'),
          password:form.get('password'),
          passwordConfirm:form.get('passwordConfirm'),
        },
        url:
        "http://localhost:27000/users/signup",
      })
      
      const {token, data} =(response.data)
      console.log(response.data)
      
      this.setState({
        me: data.user,
      isLoggedIn:true,
      auth: "Bearer " + token
      })
    // console.log(this.state.auth)
    // // const history = useHistory();
    const { history } = this.props;
    history.push('/');
    // const { navigateTo } = useContext(NavigationContext);
    // navigateTo('/');

      return true;
    }
    catch(error){
      const {status, message} = error.response.data
      console.log({status, message})
      const { addError } = this.context
      addError(message, status)

    }
  };
  toggleUser = async (id, data) => {

    try{    
      const confirmed = window.confirm("Are you sure you want to make this change?")  
      if (confirmed){

        await axios({
          method: "patch",
          url:`http://localhost:27000/users/${id}`,
          data,
          headers: { Authorization:this.state.auth },
        })
        await this.getUsers();
      }

  }
  catch(error){
      const {status, message} = error.response.data
      console.log({status, message})
      const { addError } = this.context
      addError(message, status)
  }
  }
  async componentDidMount() {
    try{
      // await this.login();
    //   await this.getData();
    //   await this.getUsers();
    }
    catch(error){
      const {status, message} = error.response.data
      console.log({status, message})
      const { addError } = this.context
      addError(message, status)

    }
  }
  getUsers = async () => {
    try{
        let response = await axios({
            method: "get",
            url:
            "http://localhost:27000/users",
            headers: { Authorization:this.state.auth,},
        })

        console.log({r:response.data.data})
        let users = response.data.data.data;
        console.log({users})

        this.setState({
          users
        })
        console.log({users})
    }
    catch(error){
      const {status, message} = error.response.data
      console.log({status, message})
      const { addError } = this.context
      addError(message, status)

    }
  };
  backup = () => {
    let password = String(prompt("Enter a password"))
    if (password !== "null" && password !== ""){
      const link = document.createElement('a');
      link.href = `http://localhost:27000/users/backup?password=${password}`;
      document.body.appendChild(link);
      link.click(); 
      link.remove()
    }
    }

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          getData: this.getData,
          getUsers: this.getUsers,
          login: this.login,
          setToken:this.setToken,
          remToken:this.remToken,
          signup:this.signup,
          logout:this.logout,
          handleChange: this.handleChange,
          backup:this.backup,
          toggleUser:this.toggleUser,
          forgotPwd:this.forgotPwd,
          resetPwd:this.resetPwd,
        }}
      >
         {React.Children.map(this.props.children, child => {
          // Clone the child element with additional props
          return React.cloneElement(child, { auth:this.state.auth, me:this.state.me, isLoggedIn:this.isLoggedIn });
        })}
        {/* {this.props.children} */}
      </UserContext.Provider>
    );
  }
}
const UserConsumer = UserContext.Consumer;

const UserProvider = withRouter(UserProviderWoutRouter)

export { UserProvider, UserConsumer, UserContext };

export function withUserConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <UserConsumer>
        {value => <Component {...props} context={value} />}
      </UserConsumer>
    );
  };
}