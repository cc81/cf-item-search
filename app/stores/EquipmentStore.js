import alt from '../libs/alt';
import EquipmentActions from '../actions/EquipmentActions';
import Equipment from 'json!../data/equipment.json';
import _ from 'lodash';

class EquipmentStore {
  constructor(){
    this.bindActions(EquipmentActions);
    this.eq = Equipment;
    this.filter = "";
    this.slotFilter = "any";
    this.affectFilter = "any";
  }

  search(query){
    this.filter = query.toLowerCase();
  }

  slotFilter(slot){
    this.slotFilter = slot;
  }

  affectFilter(affect){
    this.affectFilter = affect;
  }

  static _filterSlot(equipment, filter){
    return _.filter(equipment, x => x.wear_flags === filter);
  }

  static _filterAffect(equipment, filter){
    let res = [];
    for (let item of equipment) {
      for (let key in item.affects) {
        if (item.affects.hasOwnProperty(key)) {
          if (key === filter) {
            res.push(item);
          }
        }
      }
    }
    return res;
  }

  static getFilteredResult(){

    if (!this.state.filter && this.state.slotFilter === "any" && this.state.affectFilter === "any") {
      return this.state.eq;
    }

    let result = [];

    if (this.state.slotFilter !== "any" && this.state.affectFilter !== "any") {
      result = this._filterSlot(this.state.eq, this.state.slotFilter);
      result = this._filterAffect(result, this.state.affectFilter);
    }
    else if (this.state.slotFilter !== "any") {
      result = this._filterSlot(this.state.eq, this.state.slotFilter);
    }
    else if (this.state.affectFilter !== "any") {
      result = this._filterAffect(this.state.eq, this.state.affectFilter);
    }
    else {
        return _.filter(this.state.eq, x => x.name.toLowerCase().indexOf(this.state.filter) > -1);
    }

    return _.filter(result, x => x.name.toLowerCase().indexOf(this.state.filter) > -1);
  }
}

export default alt.createStore(EquipmentStore);
