import { doc, getDoc,setDoc, updateDoc,getDocs,collection } from "firebase/firestore";
import { auth, db } from "../firebase";


const createUser = async (username) => {
    console.log('createUser');
    const user = auth.currentUser;
    const userDoc = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDoc);
    if (!docSnap.exists()) {
        const { uid, email} = user;
        await setDoc(userDoc,{
        uid,
        email,
        username,
        createdAt: new Date(Date.now()).toLocaleDateString("en-gb"),
        roomId: null,
        status:"online"
        });
    }
}

const userAccess = async () => {
    console.log('userAccess');
    const user = auth.currentUser;
    const userDoc = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
        await updateDoc(userDoc, {
            ...docSnap.data(),
            status: "online"
        });
    }
}
const userRipoff = async () => {
    console.log('userRipoff');
    const user = auth.currentUser;
    const userDoc = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
        await updateDoc(userDoc, {
            ...docSnap.data(),
            status: "offline"
        });
    }
}

const getUsers = async () => {
    const users = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        users.push(doc.data());
    });
    return users;
}

const joinRoom = async (roomId) => {
    const user = auth.currentUser;
    const userDoc = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
        await updateDoc(userDoc, {
            ...docSnap.data(),
            roomId
        });
    }
}

const leaveRoom = async () => {
    const user = auth.currentUser;
    const userDoc = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
        await updateDoc(userDoc, {
            ...docSnap.data(),
            roomId: null
        });
    }
}
export { createUser, userAccess, userRipoff, getUsers, joinRoom, leaveRoom };