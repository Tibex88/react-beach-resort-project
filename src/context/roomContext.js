import React, { Component } from "react";
// import items from "./data";
import Client from "../Contentful";
import axios from "axios";
import { APIErrorContext } from "../context/errorContext";
import { UserContext } from "./userContext";
// import { useContext } from "react";
// const {auth} = useContext(UserContext)

// require("dotenv").config();


const RoomContext = React.createContext();

export default class RoomProvider extends Component {
  static contextType = APIErrorContext;
  
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };
  getRooms = async () => {
    try {
         let response = await axios({
          method: "get",
          url:"http://localhost:27000/rooms",
            // `/?${search}&${filter}&page=${page}&limit=16&fields=title,shortDescription,media.thumbnail`,
          headers: {
            Authorization:this.props.auth,
          },
      })
      // console.log({response:response.data.data.data})
      let rooms = this.formatData(response.data.data.data);

      let featuredRooms = [...rooms];
      let maxPrice = Math.max(...rooms.map(item => item.price));
      let maxSize = Math.max(...rooms.map(item => item.size));
      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize
      });
      return 1;
    }  catch(error){
      const {status, message} = error.response.data
      console.log({status, message})
      const { addError } = this.context
      addError(message, status)
    }
  };
  async componentDidMount() {
    await this.getRooms();
  }
  formatData(items) {
    let tempItems = items.map(item => {
      let id = item._id;
      // console.log(id)
      let images = item.images.map(image => image.url);
      // console.log(images)
      let room = { ...item, images, id };
      return room;
    });
    return tempItems;
  }
  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room._id === slug);
    return room;
  };
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    // console.log(name, value);

    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };
  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;

    let tempRooms = [...rooms];
    // transform values
    // get capacity
    capacity = parseInt(capacity);
    price = parseInt(price);
    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }
    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }
    // filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);
    //filter by size
    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );
    //filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }
    //filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }
    this.setState({
      sortedRooms: tempRooms
    });
  };
  backup = () => {

    try{ 
      const link = document.createElement('a');
      link.href = "http://localhost:27000/rooms/backup";
      document.body.appendChild(link);
      link.click(); 
      link.remove()
    } catch(error){
      const {status, message} = error.response.data
      console.log({status, message})
      const { addError } = this.context
      addError(message, status)
    }
  };
  updateRooms = async (id, data) => {
  try 
    {
        const confirmed = window.confirm("Are you sure you want to make this change?")  
        
        if (confirmed){

        await axios({
          method: "patch",
          url:`http://localhost:27000/rooms/${id}`,
          data,
          headers: {
            Authorization:this.props.auth,
          },
        })

        await this.getRooms();}
    } 
    catch(error) {
      const {status, message} = error.response.data
      console.log({status, message})
      const { addError } = this.context
      addError(message, status)
    }
  };
  deleteRoom = async (id) => {
    try{
      const confirmed = window.confirm("Are you sure you want to make this change?")  
      
      if (confirmed){

      await axios({
          method: "delete",
          url:`http://localhost:27000/rooms/${id}`,
          headers: {
            Authorization:this.props.auth,
          },
      })

      await this.getRooms();
    }
  }
  catch(error){
    const {status, message} = error.response.data
    console.log({status, message})
    const { addError } = this.context
    addError(message, status)
  }
  }

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRooms: this.getRooms,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
          updateRooms: this.updateRooms,
          deleteRoom: this.deleteRoom,
          backup:this.backup
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}
