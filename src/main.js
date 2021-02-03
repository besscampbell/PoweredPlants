import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const storeState = (initialState) => {
  let currentState = initialState;
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

// threeControl = storeState({num: 3});
// fourControl = storeState({num: 4});
// currentState = {{num: 3}, {num: 4}}
// threeControl.num;

// const stateControl = storeState();
const plant1StateControl = storeState({soil: 0, water: 1});
const plant2StateControl = storeState({soil: 2, water: 0, babies: 6});
// const initialState = { plant1StateControl, plant2StateControl };


// previously: currentState = {};
// now: currentState = { {soil: 1, water: 2}, {soil: 3, water: 5} }

// plant1Control(bluefood) // soil+=5
// changeState("soil" : (plant1StateControl["soil"] || 0) + 5);

// initialState.plant1StateControl; // {soil: 1, water: 2}
// currentState.plant1StateControl; // {soil: 1, water: 2}

// without initialState
// const plant2 = plant2StateControl(blueFood);
// results in: currentState = { { soil: 5 } }

const changeState = (prop) => {
    return (value) => {
      return (state) => {
        return {
          ...state,
          [prop] : (state[prop] || 0) + value
        }
      }
    }
  }

// const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);
const propagate = changeState("babies")(-1);
// const greenFood = changeState("soil")(10);
// const yuckyFood = changeState("soil")(-5);

// const hydrate = changeState("water")(2);
// const waterFall = changeState("water")(5);

// const fullSun = changeState("light")(6);
// const partialSun = changeState("light")(2);

$(document).ready(function() {

  $('#feed').click(function() {
    const plant1 = plant1StateControl(blueFood); 
    $('#soil-value').text(`Soil: ${plant1.soil}`);
    console.log("feed plant 1")
  })

  $('#feedPlant2').click(function() {
    const plant2 = plant2StateControl(blueFood);
    $('#soil-value2').text(`Soil: ${plant2.soil}`);
    console.log("feed plant 2")
  })

  $('#propagate').click(function() {
    const plant2prop = plant2StateControl(propagate);
    $('#babies-value').text(`Babies: ${plant2prop.babies}`);
    console.log("propagate")
  })

  $('#show-state').click(function() {
    const currentState = plant1StateControl();
    $('#soil-value').text(`Soil: ${currentState.soil}`);
  });
}); 