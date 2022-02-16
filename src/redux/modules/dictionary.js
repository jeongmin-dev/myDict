import { db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const initialState = {
  is_loaded: false,
  list: [],
};

// Actions
const LOADED = "dictionary/LOADED";
const LOAD = "dictionary/LOAD";
const CREATE = "dictionary/CREATE";
const DELETE = "dictionary/DELETE";
const UPDATE = "dictionary/UPDATE";

// Action Creators
export const isLoaded = (loaded) => {
  return { type: LOADED, loaded };
};
export const loadDictionary = (dictionary) => {
  return { type: LOAD, dictionary: dictionary, is_loaded: true };
};

export const createDictionary = (dictionary) => {
  return { type: CREATE, dictionary: dictionary };
};

export const deleteDictionary = (dictionaryId) => {
  return { type: DELETE, dictionary: dictionaryId };
};

export const updateDictionary = (dictionary) => {
  return { type: UPDATE, dictionary: dictionary };
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
    dispatch(createDictionary(dictionary_data));
  };
};

export const deleteDictionaryFB = (dictionaryId) => {
  return async function (dispatch) {
    const docRef = doc(db, "my_dictionary", dictionaryId);
    await deleteDoc(docRef);
    dispatch(deleteDictionary(dictionaryId));
  };
};

export const updateDictionaryFB = (dictId, dictionary) => {
  return async function (dispatch) {
    const docRef = doc(db, "my_dictionary", dictId);
    await updateDoc(docRef, dictionary);
    dispatch(loadDictionaryFB());
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "dictionary/LOADED": {
      return { ...state, is_loaded: action.loaded };
    }
    case "dictionary/LOAD": {
      return {
        list: action.dictionary,
        is_loaded: true,
      };
    }
    case "dictionary/CREATE": {
      const new_dictionary_list = [...state.list, action.dictionary];
      return { list: new_dictionary_list, is_loaded: true };
    }
    case "dictionary/DELETE": {
      const new_dictionary_list = state.list.filter((dictionary) => {
        return dictionary.id !== action.dictionary;
      });
      return { list: new_dictionary_list, is_loaded: true };
    }
    case "dictionary/UPDATE": {
      const new_dictionary_list = state.list.map((dictionary) => {
        if (dictionary.word === action.dictionary.word) {
          return action.dictionary;
        }
        return dictionary;
      });
      return { list: new_dictionary_list, is_loaded: true };
    }

    default:
      return state;
  }
}
