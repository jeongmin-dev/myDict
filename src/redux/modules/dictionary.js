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
const UPDATE = "dictionary/UPDATE";
// const DELETE = "dictionary/DELETE";

// Action Creators
export const isLoaded = (loaded) => {
  return { type: LOADED, loaded };
};
export const loadDictionary = (dictionary) => {
  return { type: LOAD, dictionary, is_loaded: true };
};

export const createDictionary = (dictionary) => {
  return { type: CREATE, dictionary };
};

export const updateDictionary = (dictionary) => {
  return { type: UPDATE, dictionary };
};

// Middlewares
export const loadDictionaryFB = () => {
  return async function (dispatch) {
    const dictionary_data = await getDocs(collection(db, "my_dictionary"));
    const dictionary_list = [];
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

    dispatch(createDictionary(dictionary_data), isLoaded(false));
  };
};

export const updateDictionaryFB = (dictionary) => {
  return async function (dispatch) {
    const docRef = await doc(db, "my_dictionary", dictionary.id);
    await updateDoc(docRef, dictionary);
    dispatch(updateDictionary(dictionary));
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
    case "dictionary/UPDATE":
      return {
        list: state.dictionary.map((dic) =>
          dic.id === action.dic.id ? action.dic : dic
        ),
      };

    default:
      return state;
  }
}
