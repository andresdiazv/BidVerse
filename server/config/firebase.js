const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const admin = require('firebase-admin');
const serviceAccount =  require('./credentials.json')
const { getStorage, ref, uploadBytes, getDownloadURL} = require('@firebase/storage')
initializeApp ( {
  credential: cert(serviceAccount)
})

const db = getFirestore()
const auth = admin.auth();


module.exports = { db, auth, admin }