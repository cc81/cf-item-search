import React from 'react';
import CharacterStore from '../stores/CharacterStore';
import CharacterActions from '../actions/CharacterActions';

export default class Character extends React.Component {
  constructor(props){
    super(props);

    this.storeChanged = this.storeChanged.bind(this);
    this.state = CharacterStore.getState();
  }

  componentDidMount() {
    CharacterStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    CharacterStore.unlisten(this.storeChanged);
  }

  storeChanged(state) {
    this.setState(state);
  }

  summary(){
    return JSON.stringify(CharacterStore.getSummaryOfAffects(), null, 1);
  }

  summaryFlags(){
    return JSON.stringify(CharacterStore.getSummaryOfFlags(), null, 1);
  }

  deleteItem(slot){
    CharacterActions.deleteSlot(slot);
  }

  renderItem(obj, slot){
    if (obj) {
      return (
        <span>{obj.name} <i className="fa fa-times remove" onClick={this.deleteItem.bind(this, slot)}></i></span>
      );
    }
    return "";
  }


  render(){

    return(
      <div>
        <div className="character">
        <strong>Equipment:</strong>
          <pre>
            &lt;worn on finger&gt; {this.renderItem(this.state.character.ring1, "ring1")}<br />
          &lt;worn on finger&gt; {this.renderItem(this.state.character.ring2, "ring2")}<br />
        &lt;worn around neck&gt; {this.renderItem(this.state.character.neck1, "neck1")}<br />
      &lt;worn around neck&gt; {this.renderItem(this.state.character.neck2, "neck2")}<br />
    &lt;worn on body&gt; {this.renderItem(this.state.character.body, "body")}<br />
  &lt;worn on head&gt; {this.renderItem(this.state.character.head, "head")}<br />
&lt;worn on face&gt; {this.renderItem(this.state.character.face, "face")}<br />
  &lt;worn on legs&gt; {this.renderItem(this.state.character.legs, "legs")}<br />
&lt;worn on feet&gt; {this.renderItem(this.state.character.feet, "feet")}<br />
            &lt;worn on hands&gt;  {this.renderItem(this.state.character.hands, "hands")}<br />
          &lt;worn on arms&gt; {this.renderItem(this.state.character.arms, "arms")}<br />
        &lt;worn about body&gt; {this.renderItem(this.state.character.about, "about")}<br />
      &lt;worn about waist&gt; {this.renderItem(this.state.character.waist, "waist")}<br />
    &lt;worn around wrist&gt; {this.renderItem(this.state.character.wrist1, "wrist1")} <br />
  &lt;worn around wrist&gt; {this.renderItem(this.state.character.wrist2, "wrist2")} <br />
&lt;mainhand wielded&gt; {this.renderItem(this.state.character.wield1, "wield1")}<br />
    &lt;offhand wielded&gt; {this.renderItem(this.state.character.wield2, "wield2")}<br />
        </pre>
        </div>
        <div>
          <strong>Affects:</strong>
          <pre>{this.summary()}</pre>
            <strong>Flags:</strong>
            <pre>{this.summaryFlags()}</pre>
        </div>
      </div>
    );
  }

}
