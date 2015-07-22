import React from 'react';
import CharacterActions from '../actions/CharacterActions';

export default class Item extends React.Component {
  constructor(props){
    super(props);

  }

  wearItem(){
    CharacterActions.wearItem(this.props.item);
  }

  render(){
    return (
      <div>
        <pre>
          {JSON.stringify(this.props.item, null, 1)}
        </pre>
        <button className="button-primary" onClick={this.wearItem.bind(this, null)}>Wear</button>
        <hr />
      </div>
      );
  }

}
