import alt from '../libs/alt';
import CharacterActions from '../actions/CharacterActions';
import _ from 'lodash';

class CharacterStore{
  constructor(){
    this.bindActions(CharacterActions);

    this.character = {};
  }

  deleteSlot(slot){
    delete this.character[slot];
  }

  wearItem(item){
    switch (item.wear_flags) {
      case "finger":
        this.wearRing(item);
        break;
      case "hold":
        this.holdItem(item);
        break;
      case "neck":
        this.wearNeck(item);
        break;
      case "shield":
        this.wearShield(item);
        break;
      case "wield":
        this.wieldWeapon(item);
        break;
      case "wrist":
        this.wearWrist(item);
        break;
      default:
        this.wearDefault(item);
    }
  }

  wearShield(item){
    delete this.character.wield2;
    this.character.shield = item;
  }

  wieldWeapon(item){
    if (item.weapon_flags === "two-handed") {
      this.character.wield1 = item;
      if (this.character.wield2) {
        delete this.character.wield2;
      }
    }
    else {
      if (!this.character.wield1 || this.character.wield1.weapon_flags === "two-handed") {
        this.character.wield1 = item;
      }
      else {
        this.character.wield2 = item;
      }
    }
  }

  holdItem(item){

  }



  wearWrist(item){
    if (!this.character.wrist1) {
      this.character.wrist1 = item;
    }
    else {
      this.character.wrist2 = item;
    }
  }

  wearRing(item){
    if (!this.character.ring1) {
      this.character.ring1 = item;
    }
    else {
      this.character.ring2 = item;
    }
  }

  wearNeck(item){
    if (!this.character.neck1) {
      this.character.neck1 = item;
    }
    else {
      this.character.neck2 = item;
    }
  }


  wearDefault(item){
    this.character[item.wear_flags] = item;
  }

  static getSummaryOfAffects(){

    let summary = {};
    for (var key in this.state.character) {
      if (this.state.character.hasOwnProperty(key)) {
        let obj = this.state.character[key];
        for (var aff in obj.affects) {
          if (obj.affects.hasOwnProperty(aff)) {
            if (summary[aff]) {
                summary[aff] += Number(obj.affects[aff]);
            }
            else {
              summary[aff] = Number(obj.affects[aff]);
            }
          }
        }
      }
    }
    return summary;
  }

  static getSummaryOfFlags(){
    let flags = [];

    for (var key in this.state.character) {
      if (this.state.character.hasOwnProperty(key)) {
        let obj = this.state.character[key];
        flags = flags.concat(obj.flags.split(' '));
      }
    }
    return _.compact(_.uniq(flags));
  }


}

export default alt.createStore(CharacterStore);

/*
<select name="slot" id="slot">
                <option value="any">any</option>
                                    <option value="about">about</option>
                                    <option value="arms">arms</option>
                                    <option value="back">back</option> ??
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
                            </select>*/
