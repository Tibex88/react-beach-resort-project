import React, { Component } from "react";
import { useContext } from 'react';
// import { NavigationContext } from './navigationContext';
import { withRouter } from "react-router";
import axios from "axios";

// require("dotenv").config();


const UserContext = React.createContext();

export default class UserProviderWoutRouter extends Component {  
  state = {
    users:[],
    me:{},
    auth: null
  };

  setToken = (token) =>{
    localStorage.setItem("token",token)
    this.setState({
      auth : "Bearer " + token
    })
  }

  remToken = () =>{
    localStorage.setItem("token",null)
    this.setState({
      auth : null
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
      let allusers = await axios({
        method: "get",
        url:
        "http://localhost:27000/users",
          // `/?${search}&${filter}&page=${page}&limit=16&fields=title,shortDescription,media.thumbnail`,
        headers: {
          Authorization:this.state.auth,
        },
    })

      let users =  allusers.data.data.data
      let me = response.data.data.data[0];
      console.log({me})

      // let id =  me.id
      // let firstName =  me.firstName
      // let lastName =  me.lastName
      // let email =  me.email
      // let phoneNumber =  me.phoneNumber
      // let photo =  me.photo
      // let role =  me.role

      this.setState({
        users,
        me,
        // firstName,
        // lastName,
        // email,
        // id,
        // phoneNumber,
        // photo,
        // role,
      })

    //   this.setState({
    //     rooms,
    //     featuredRooms,
    //     sortedRooms: rooms,
    //     loading: false,
    //     //
    //     price: maxPrice,
    //     maxPrice,
    //     maxSize
    //   });
    //   return 1;
    } catch (error) {
    //   console.log(error);
    }
  };

  login = async (event) => {
    
    try{
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      let response = await axios({
        method: "post",
        data:{
          email:form.get('email'), password:form.get('password')
        },
        url:
        "http://localhost:27000/users/login",
      })
      
      const {token, data} =(response.data)
      
      this.setState({
        me: data.user,
        auth: "Bearer " + token
      })
    console.log(this.state.auth)
    // const history = useHistory();
    const { history } = this.props;
    history.push('/');
    // const { navigateTo } = useContext(NavigationContext);
    // navigateTo('/home');

      return true;
    }
    catch(error){
      console.log(error)
    }
  };

  logout = async () => {
    
    try{
    await axios({
        method: "get",
        url:
        "http://localhost:27000/users/logout",
      })
      console.log("first")
    const { history } = this.props;
    history.push('/signin');

    this.state.auth = null

      return true;
    }
    catch(error){
      console.log(error)
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
        auth: "Bearer " + token
      })
    // console.log(this.state.auth)
    // // const history = useHistory();
    const { history } = this.props;
    history.push('/');
    // const { navigateTo } = useContext(NavigationContext);
    // navigateTo('/home');

      return true;
    }
    catch(error){
      console.log(error)
    }
  };

  async componentDidMount() {
    await this.getData();
    // await this.getUsers();
  }

  // formatData(items) {
  //   let tempItems = items.map(item => {
  //     let id = item._id;
  //     console.log(id)
  //     let images = item.images.map(image => image.url);
  //     console.log(images)
  //     let room = { ...item, images, id };
  //     return room;
  //   });
  //   return tempItems;
  // }
  getUsers = async () => {
    try{
        let response = await axios({
            method: "get",
            url:
            "http://localhost:27000/users/",
              // `/?${search}&${filter}&page=${page}&limit=16&fields=title,shortDescription,media.thumbnail`,
            headers: {
              Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTdjOTNlMmEzMmM0NDUxOGViMDY5NCIsImlhdCI6MTcwNDQ2NDE5NywiZXhwIjoxNzEyMjQwMTk3fQ.aGWaNcSHFaqI7kfcCteMurEiz1oa379ub45KCe0J7TM',
            },
        })
        let users = response.data.data.data;
        console.log({users})
    }
    catch(error){
        console.log(error)
    }
  };
  // handleChange = event => {
  //   const target = event.target;
  //   const value = target.type === "checkbox" ? target.checked : target.value;
  //   const name = target.name;
  //   console.log(name, value);

  //   this.setState(
  //     {
  //       [name]: value
  //     },
  //     this.filterRooms
  //   );
  // };
  // filterRooms = () => {
  //   let {
  //     rooms,
  //     type,
  //     capacity,
  //     price,
  //     minSize,
  //     maxSize,
  //     breakfast,
  //     pets
  //   } = this.state;

  //   let tempRooms = [...rooms];
  //   // transform values
  //   // get capacity
  //   capacity = parseInt(capacity);
  //   price = parseInt(price);
  //   // filter by type
  //   if (type !== "all") {
  //     tempRooms = tempRooms.filter(room => room.type === type);
  //   }
  //   // filter by capacity
  //   if (capacity !== 1) {
  //     tempRooms = tempRooms.filter(room => room.capacity >= capacity);
  //   }
  //   // filter by price
  //   tempRooms = tempRooms.filter(room => room.price <= price);
  //   //filter by size
  //   tempRooms = tempRooms.filter(
  //     room => room.size >= minSize && room.size <= maxSize
  //   );
  //   //filter by breakfast
  //   if (breakfast) {
  //     tempRooms = tempRooms.filter(room => room.breakfast === true);
  //   }
  //   //filter by pets
  //   if (pets) {
  //     tempRooms = tempRooms.filter(room => room.pets === true);
  //   }
  //   this.setState({
  //     sortedRooms: tempRooms
  //   });
  // };

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
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
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
