import React, { Component } from 'react';

const APIErrorContext = React.createContext();

export default class APIErrorProvider extends Component {

    state = {
        error: null,
        isError:false
    }
   removeError = () => this.setState({
    error:null,
    isError:false
   });
   addError = (message, status) => this.setState({
     error:{message, status},
     isError:true 
    });

    render() {
        return (
            <APIErrorContext.Provider value={{
                ...this.state,
                addError:this.addError,
                removeError:this.removeError,
            }}>
            {this.props.children}
            </APIErrorContext.Provider>
            );  
    }
}

const APIErrorConsumer = APIErrorContext.Consumer;

export { APIErrorProvider, APIErrorConsumer, APIErrorContext };


export function withAPIErrorConsumer(Component) {
    return function ConsumerWrapper(props) {
      return (
        <APIErrorConsumer>
          {value => <Component {...props} context={value} />}
        </APIErrorConsumer>
      );
    };
  }