import config from "config";
import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";

function initFireBase() {
    const serviceAccount = config.get<ServiceAccount>("firebase.serviceAccount");
    const cert = admin.credential.cert(serviceAccount);
    const firebase = admin.initializeApp({
        credential: cert
    })
    return firebase;
}

export default initFireBase();