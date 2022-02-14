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
  is_loaded: false,
  list: [
    {
      word: "test",
      meaning: "test",
      example: "test",
    },
  ],
};

// Actions
const LOADED = "dictionary/LOADED";
const LOAD = "dictionary/LOAD";
const CREATE = "dictionary/CREATE";
// const UPDATE = "dictionary/UPDATE";
const DELETE = "dictionary/DELETE";

// Action Creators
export function isLoaded(loaded) {
  return { type: LOADED, loaded };
}
export function loadDictionary(dictionary) {
  return { type: LOAD, dictionary: dictionary, is_loaded: true };
}

export function createDictionary(dictionary) {
  return { type: CREATE, dictionary: dictionary };
}

export function deleteDictionary(dictionary_idx) {
  return { type: DELETE, dictionary_idx };
}

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
    dispatch(isLoaded(false));
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
        is_loaded: true,
      };
    case "dictionary/CREATE":
      const new_dictionary_list = [...state.list, action.dictionary];
      return { ...state, list: new_dictionary_list, is_loaded: true };

    case "dictionary/DELETE": {
      const new_dictionary_list = state.list.filter((l, idx) => {
        return parseInt(action.dictionary_idx) !== idx;
      });
      return { list: new_dictionary_list };
    }

    default:
      return state;
  }
}
