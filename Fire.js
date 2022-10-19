import Firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbdCXfqMB3tO7PTZS0c_o8A2gqQmicEto",
  authDomain: "todoapp-19001.firebaseapp.com",
  projectId: "todoapp-19001",
  storageBucket: "todoapp-19001.appspot.com",
  messagingSenderId: "945862682778",
  appId: "1:945862682778:web:c7e2101c9248bb98d11723",
};
class Fire {
  constructor(callback) {
    this.init(callback);
  }
  init(callback) {
    if (!Firebase.apps.length) {
      Firebase.initializeApp(firebaseConfig);
    }

    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        Firebase.auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }
  getLists(callback) {
    let ref = this.ref.orderBy("name");
    this.unsubscribe = ref.onSnapshot((snapshot) => {
      let lists = [];
      snapshot.forEach((doc) => {
        console.log(doc.data);
        lists.push({ id: doc.id, ...doc.data() });
      });

      callback(lists);
    });
  }

  addList(list) {
    let ref = this.ref;
    ref.add(list);
  }

  updateList(list) {
    let ref = this.ref;
    ref.doc(list.id).update(list);
  }

  get userId() {
    return Firebase.auth().currentUser.uid;
  }

  get ref() {
    return Firebase.firestore()
      .collection("users")
      .doc(this.userId)
      .collection("list");
  }

  detach() {
    this.unsubscribe();
  }
}
export default Fire;
