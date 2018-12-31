import React from 'react';
import { formatPrice } from '../helpers'

class Fish extends React.Component {
  // handleClick = () => {
  //   this.props.addToOrder(this.props.index);
  // }
  render() {
    const {image, name, price, desc, status} = this.props.details;
    const isAvailable = status === 'available';

    return <li className="menu-fish"> 
      <img src={image} alt={name} />
      <h3 className="fish-name">
        {name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>
      {/* the onclick function is inline because it's only used once, but if you were going to use it more than once, it's better to create a function at the top */}
      <button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)}>
      {isAvailable ? 'Add To Order' : 'Sold Out!'}!</button>

    </li>
  }
}

export default Fish;