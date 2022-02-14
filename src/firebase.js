import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // firebase 설정과 관련된 개인 정보
  apiKey: "AIzaSyA3yhhxQcPL5nfenUmJ0DqcnC_j1WrS8JY",
  authDomain: "mydictionary-eba4d.firebaseapp.com",
  projectId: "mydictionary-eba4d",
  storageBucket: "mydictionary-eba4d.appspot.com",
  messagingSenderId: "709700215608",
  appId: "1:709700215608:web:e0b858139348e6bc93d7cd",
  measurementId: "G-5QLX9HT4ZD",
};

// firebaseConfig 정보로 firebase 시작
initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const db = getFirestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { db };
