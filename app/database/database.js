import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/analytics'
import config from '../../config'
import rawData from '../database/hospitals'

// Initialize Firebase
firebase.initializeApp(config.firebaseConfig)
firebase.analytics()
const db = firebase.firestore()

export default {    
    addHospitalData(hospitalData) {
        this.getAllHospitalNames()
            .then(hospitalNames => {
                hospitalData.forEach((data, index) => {
                    if (!hospitalNames.includes(data.hospital.name)) {
                        let hospitalInRawData = rawData.find(hos => hos.name === data.hospital.name)

                        db.collection('hospitals').add({
                            id: data.hospital_id,
                            name: data.hospital.name,
                            district: '',
                            country: '',
                            location: hospitalInRawData ? hospitalInRawData.latLng : {},
                            cumulativeLocal: data.cumulative_local,
                            cumulativeForeign: data.cumulative_foreign,
                            treatmentLocal: data.treatment_local,
                            treatmentForeign: data.treatment_foreign,
                            cumulativeTotal: data.cumulative_total,
                            treatmentTotal: data.treatment_total
                        })
                        .then(docRef => {
                            console.log('Document written with ID: ', docRef.id)
                        })
                        .catch(err => {
                            console.log('Error adding document: ', err)
                        })
                    } else {
                        let hospitalInRawData = rawData.find(hos => hos.name === data.hospital.name)
                        console.log('hos in raw data: ', hospitalInRawData)
                        console.log('already included: ', index+1, ' - ', data.hospital.name)
                    }
                })
            })
    },

    getAllHospitalNames() {
        return new Promise((resolve, reject) => {
            db.collection('hospitals').get()
                .then(querySnapshot => {
                    let hospitalNames = []
                    querySnapshot.forEach(doc => {
                        hospitalNames.push(doc.data().name)
                    })

                    resolve(hospitalNames)
                })
                .catch(err => {
                    console.log('Error getting hospital names: ', err)
                    reject(err)
                })
        })
    },
    
    getAllHospitals() {
        return new Promise((resolve, reject) => {
            db.collection('hospitals').get()
                .then(querySnapshot => {
                    let allDocs = []
                    querySnapshot.forEach(doc => {
                        allDocs.push(doc.data())
                    })

                    resolve(allDocs)
                })
                .catch(err => {
                    console.log('Error getting all hospitals: ', err)
                })
        })
    },
}