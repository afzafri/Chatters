import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
const firebaseApp = firebase.initalizeApp(firebaseConfig)
export default firebaseApp.firestore()
