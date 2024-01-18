import React, { Component } from "react";
// import items from "./data";
import Client from "../Contentful";
import axios from "axios";

// require("dotenv").config();


const RoomContext = React.createContext();

export default class RoomProvider extends Component {
  
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
  //     let response = await Client.getEntries({
    // content_type: "beachResortRoom"
  // });
         let response = await axios({
          method: "get",
          url:"http://localhost:27000/rooms",
            // `/?${search}&${filter}&page=${page}&limit=16&fields=title,shortDescription,media.thumbnail`,
          headers: {
            Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTdjOTNlMmEzMmM0NDUxOGViMDY5NCIsImlhdCI6MTcwNDQ2NDE5NywiZXhwIjoxNzEyMjQwMTk3fQ.aGWaNcSHFaqI7kfcCteMurEiz1oa379ub45KCe0J7TM',
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
    } catch (error) {
      console.log(error);
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

  const link = document.createElement('a');
  link.href = "http://localhost:27000/rooms/backup";
  document.body.appendChild(link);
  link.click(); 
  link.remove()
  }

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRooms: this.getRooms,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
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
