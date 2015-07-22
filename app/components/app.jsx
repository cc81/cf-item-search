import React from 'react';
import _ from 'lodash';
import EquipmentActions from '../actions/EquipmentActions';
import EquipmentStore from '../stores/EquipmentStore';

import Item from './item';
import Character from './character';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.storeChanged = this.storeChanged.bind(this);
    this.state = EquipmentStore.getState();
  }

  componentDidMount() {
    EquipmentStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    EquipmentStore.unlisten(this.storeChanged);
  }

  storeChanged(state) {
    this.setState(state);
  }

  loadItems(){
    return _.map(EquipmentStore.getFilteredResult(), x => <Item item={x} />);
  }

  search(e){
    EquipmentActions.search(e.target.value);
  }

  slotFilter(e){
    EquipmentActions.slotFilter(e.target.value);
  }

  affectFilter(e){
    EquipmentActions.affectFilter(e.target.value);
  }

  render() {
    return (
      <div>
        <div className="row header"><h2>cf item search</h2></div>
      <div className="row content">
      <div className="five columns">
          <Character />
        </div>
        <div className="seven columns">
          <input className="searchWidth" type="search" placeholder="search name" id="searchInput" ref="searchInput" onChange={this.search} value={this.state.filter} /><br />
            <select name="slot" className="inputWidth" onChange={this.slotFilter}>
                  <option value="any">any</option>
                  <option value="about">about</option>
                  <option value="arms">arms</option>
                  <option value="back">back</option>
                  <option value="body">body</option>
                  <option value="claws">claws</option>
                  <option value="ears">ears</option>
                  <option value="face">face</option>
                  <option value="feet">feet</option>
                  <option value="finger">finger</option>
                  <option value="forepaws">forepaws</option>
                  <option value="hands">hands</option>
                  <option value="head">head</option>
                  <option value="hindpaws">hindpaws</option>
                  <option value="hold">hold</option>
                  <option value="hooves">hooves</option>
                  <option value="horns">horns</option>
                  <option value="legs">legs</option>
                  <option value="neck">neck</option>
                  <option value="shield">shield</option>
                  <option value="tail">tail</option>
                  <option value="waist">waist</option>
                  <option value="wield">wield</option>
                  <option value="wings">wings</option>
                  <option value="wrist">wrist</option>
            </select>

            <select name="affect" className="inputWidth" onChange={this.affectFilter}>
                <option value="any">any</option>
                <option value="acid resistance">acid resistance</option>
                <option value="age">age</option>
                <option value="armor class">armor class</option>
                <option value="bash resistance">bash resistance</option>
                <option value="charisma">charisma</option>
                <option value="cold resistance">cold resistance</option>
                <option value="constitution">constitution</option>
                <option value="damage roll">damage roll</option>
                <option value="dexterity">dexterity</option>
                <option value="disease resistance">disease resistance</option>
                <option value="drowning resistance">drowning resistance</option>
                <option value="energy resistance">energy resistance</option>
                <option value="fire resistance">fire resistance</option>
                <option value="hit roll">hit roll</option>
                <option value="holy resistance">holy resistance</option>
                <option value="hp">hp</option>
                <option value="hp regeneration">hp regeneration</option>
                <option value="intelligence">intelligence</option>
                <option value="light resistance">light resistance</option>
                <option value="lightning resistance">lightning resistance</option>
                <option value="mana">mana</option>
                <option value="mana regeneration">mana regeneration</option>
                <option value="morale">morale</option>
                <option value="movement regeneration">movement regeneration</option>
                <option value="moves">moves</option>
                <option value="negative resistance">negative resistance</option>
                <option value="pierce resistance">pierce resistance</option>
                <option value="poison resistance">poison resistance</option>
                <option value="save vs breath">save vs breath</option>
                <option value="save vs mental">save vs mental</option>
                <option value="save vs paralysis">save vs paralysis</option>
                <option value="save vs spell">save vs spell</option>
                <option value="slash resistance">slash resistance</option>
                <option value="strength">strength</option>
                <option value="wisdom">wisdom</option>
            </select>

            {this.loadItems()}
        </div>
        </div>
      </div>
    );
  }
}
