import React from 'react';
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'


class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
      const { params } = this.props.match;
      // first reinstate our localStorage
      const localStorageRef = localStorage.getItem(params.storeId);
      if(localStorage){
        this.setState({ order: JSON.parse(localStorageRef)})
      }      
      this.ref = base.syncState(`${params.storeId}/fishes`, {
        context: this,
        state: 'fishes',
      });
    }
    
    componentDidUpdate () {
      localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
      base.removeBinding(this.ref);
    }


    addFish = (fish) => {
        // take a copy of the existing state
        const fishes = {...this.state.fishes};
        // add our new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;
        // set the new fishes object to state
        this.setState({ fishes });
    };

    updateFish = (key, updateFish) => {
      //take a copy of the current state
      const fishes = { ...this.state.fishes };
      // update that state
      fishes[key] = updateFish;
      // set that to state
      this.setState({ fishes });
    };

    deleteFish = (key) => {
      // take a copy of the current state
      const fishes = {...this.state.fishes };
      //updatte the state
      fishes[key] = null;
      // update state
      this.setState({ fishes });
    }

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    }

    addToOrder = key => {
      // take a copy of state
      const order = {...this.state.order}
      // either add or update the number in our order
      order[key] = order[key] + 1 || 1;
      //call setState to update our state object
      this.setState({ order });
    }

    removeFromOrder = key => {
      // take a copy of state
      const order = { ...this.state.order}
      // remove that item from order
      delete order[key];
      //call setState to update our state object
      this.setState({ order });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                      {Object.keys(this.state.fishes).map(key => (
                      <Fish 
                        key={key} 
                        index={key}
                        details={this.state.fishes[key]} 
                        addToOrder={this.addToOrder} 
                      />
                    ))}
                    </ul>
                </div>
                <Order 
                  fishes={this.state.fishes} 
                  order={this.state.order} 
                  removeFromOrder={this.removeFromOrder}
                />
                <Inventory 
                  addFish={this.addFish} 
                  updateFish={this.updateFish}
                  deleteFish={this.deleteFish}
                  loadSampleFishes={this.loadSampleFishes}
                  fishes={this.state.fishes}
                />
            </div>
        );
    }
}

export default App;