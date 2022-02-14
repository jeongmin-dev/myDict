import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const initialState = {
  list: [
    {
      word: "test",
      meaning: "test",
      example: "test",
    },
  ],
};

// Actions
const LOAD = "dictionary/LOAD";
const CREATE = "dictionary/CREATE";
// const UPDATE = "dictionary/UPDATE";
// const REMOVE = 'my-app/widgets/REMOVE';

// Action Creators
export const loadDictionary = (dictionary) => {
  return { type: LOAD, dictionary: dictionary };
};

export const createDictionary = (dictionary) => {
  return { type: CREATE, dictionary: dictionary };
};

// Middlewares
export const loadDictionaryFB = () => {
  return async function (dispatch) {
    const dictionary_data = await getDocs(collection(db, "my_dictionary"));

    let dictionary_list = [];

    dictionary_data.forEach((dict) => {
      dictionary_list.push({ id: dict.id, ...dict.data() });
    });

    dispatch(loadDictionary(dictionary_list));
  };
};

export const createDictionaryFB = (dictionary) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "my_dictionary"), dictionary);
    const dictionary_data = { id: docRef.id, ...dictionary };

    dispatch(createDictionary(dictionary_data));
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "dictionary/LOAD":
      return {
        list: action.dictionary,
      };
    case "dictionary/CREATE":
      const new_dictionary_list = [...state.list, action.dictionary];
      return { ...state, list: new_dictionary_list };

    default:
      return state;
  }
}
