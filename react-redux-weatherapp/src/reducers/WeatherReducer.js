import { FETCH_WEATHER } from "../actions/ActionsIndex";

export default (state = [], action)=>{
  switch(action.type){
    case FETCH_WEATHER:
    return [action.payload.data, ...state];
  }
  return state;
}