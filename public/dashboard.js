let logOut = () => {
    firebase.auth().signOut().then(() => {
        window.location = "login.html"
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}
let uploadFiles = (file) => {
    return new Promise((resolve, reject) => {
        let storageRef = firebase.storage().ref(`myImages/${file.name}`);
        let uploading = storageRef.put(file);
        uploading.on('state_changed',
            (snapshot) => {

                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                uploading.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    resolve(downloadURL)
                });
            }
        );
    })
}

let addProduct = () => {
    firebase.auth().onAuthStateChanged(async (user) => {
        let itemName = document.getElementById("itemName");
        let category = document.getElementById("category");
        let delType = document.getElementById("delType");
        let price = document.getElementById("price");
        let pic = document.getElementById("image");
        let uid = user.uid;
        let image = await uploadFiles(pic.files[0]);
        firebase.database().ref(`products`).push({
            itemName: itemName.value,
            category: category.value,
            delType: delType.value,
            price: "Rs: " + price.value,
            pic: image,
            status: "pending",
            uid: uid,
        })
        document.getElementById("close").click()
    })

}



let product = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let pro = firebase.database().ref(`products`).orderByChild("uid").equalTo(user.uid);
            // console.log(pro)
            pro.on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    console.log(childKey);
                    let proTab = document.getElementById("pro-tab");
                    proTab.innerHTML += `
            <div class="card mt-2 mb-2 shadow" style="width: 18rem;">
            <img src="${childData.pic}" class="card-img-top" alt="...">
            <div class="card-body">
            <p class="card-text"><strong>Item Name :</strong>${childData.itemName} </p>
            <p class="card-text"><strong>Catergory :</strong>${childData.category} </p>
            <p class="card-text"><strong>Price :</strong>${childData.price} </p>
            <p class="card-text"><strong>Type of Delivery :</strong>${childData.delType} </p>
            <button type="button" class="btn myBtn" data-toggle="modal" data-target="#editProducts" onclick="edit('${childKey}')">Edit</button>
            </div>
            </div>`
                });
            });

        }
    })
}

let edit = (key) => {
    let itemKey = document.getElementById("itemKey");
    itemKey.value = key;
}
let editProduct= ()=>{
    firebase.auth().onAuthStateChanged(async(user) => {
        let itemName = document.getElementById("itemName1");
        let category = document.getElementById("category1");
        let delType = document.getElementById("delType1");
        let price = document.getElementById("price1");
        let pic = document.getElementById("image1");
        let itemKey = document.getElementById("itemKey");
        let image = await uploadFiles(pic.files[0]);
        console.log(image.value);
        if (user) {
            console.log(itemName.value)
            firebase.database().ref(`products/${itemKey.value}`).update({
                itemName: itemName.value,
                category: category.value,
                delType: delType.value,
                price:"Rs: "+price.value,
                pic: image,
            })
            document.getElementById("close").click()
        }
    }

    )

}


// firebase.database().ref(`users/dishes/${RestId}/${dsihId}`).on("value", (dishData) => {
//     itemName.value = dishData.val().foodName
//     price.value = dishData.val().foodPrice
//     foodCatagoryE.value = dishData.val().foodCatagory
//     DeleveryTypeE.value = dishData.val().deleveryType
// }
// )
// }

// let profileName = () => {
//     firebase.auth().onAuthStateChanged((user) => {
//         if (user) {
//             firebase.database().ref(`resturant/${user.uid}`).once("value", (data) => {
//                 let profileName = document.getElementById("profileName");
//                 profileName.innerHTML = `Welcome ${data.val().resturantName}`
//             })
//         }
//     })
// }


let pending = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let pro = firebase.database().ref(`cart`).orderByChild("status").equalTo("pending");
            console.log(pro)
            pro.on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    console.log(childKey);
                    let userPendingOrders1 = document.getElementById("userPendingOrders");
                    userPendingOrders1.innerHTML += `
            <div class="card myCard" style="width: 18rem;">
        <img src="${childData.pic}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${childData.itemName}</h5>
          <p class="card-text">${childData.category} </p>
          <p class="card-text">Price Rs ${childData.price} </p>
          <p class="card-text">Type of Delivery ${childData.delType} </p>          
        </div>
    </div>`
                });
            });

        }
    })
}

let array = []
let addToCart = (obj, user) => {
    let dummyArray = [...array]
    dummyArray.push(obj)
    array = dummyArray
    console.log(obj)
    firebase.database().ref(`cart/${user.uid}`).update(obj)
}

let pendingOrder = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let pro = firebase.database().ref(`cart`).orderByChild("uid").equalTo(user.uid);
            console.log(pro)
            pro.on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    console.log(childKey);
                    let pendingOrder1 = document.getElementById("pendingOrder");
                    pendingOrder1.innerHTML += `
            <div class="card myCard" style="width: 18rem;">
        <img src="${childData.pic}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${childData.itemName}</h5>
          <p class="card-text">${childData.category} </p>
          <p class="card-text">Price Rs ${childData.price} </p>
          <p class="card-text">Type of Delivery ${childData.delType} </p>
          <p class="card-text">Type of status ${childData.status} </p>
          <button onclick=${accept(data.val(), user)}>Accept</button>            
        </div>
    </div>`
                });
            });

        }
    })
}