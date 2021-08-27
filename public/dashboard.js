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
            price: price.value,
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
                price: price.value,
                pic: image,
            })
            document.getElementById("close").click()
        }
    }

    )

}


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
                    <div class="card border-danger mb-3" style="max-width: 18rem;">
                    <img src="${childData.pic}" class="card-img-top" alt="...">
                    <div class="card-header">${childData.itemName}</div>
                    <div class="card-body text-dark">
                      <p class="card-text"><strong>Catergory :</strong>${childData.catergory} </p>
                      <p class="card-text"><strong>Price Rs :</strong>${childData.price} </p>
                      <p class="card-text"><strong>Type of Delivery :</strong>${childData.delType} </p>
                      <p class="card-text"><strong>Status :</strong>${childData.status} </p>       
                            
                    </div>
                </div>`
                });
            });

        }
    })
}



let pendingOrder = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let pro = firebase.database().ref(`cart`).orderByChild("uid").equalTo(user.uid);
            // console.log(pro)
            let pendingOrder1 = document.getElementById("pendingOrder");
            pendingOrder1.innerHTML=""
            pro.on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    console.log(childKey);
                    pendingOrder1.innerHTML += `
                    <div class="card border-danger mb-3" style="max-width: 18rem;">
                    <img src="${childData.pic}" class="card-img-top" alt="...">
                    <div class="card-header">${childData.itemName}</div>
                    <div class="card-body text-dark">
                      <p class="card-text"><strong>Catergory :</strong>${childData.catergory} </p>
                      <p class="card-text"><strong>Price Rs :</strong>${childData.price} </p>
                      <p class="card-text"><strong>Type of Delivery :</strong>${childData.delType} </p>
                      <p class="card-text"><strong>Status :</strong>${childData.status} </p>
                      <button class="btn myBtn" onclick="accept(this,'${childKey}')" >Accept</button>       
                            
                    </div>
                </div>`
                });
            });

        }
    })
}
let accept=(btn,a)=>{
console.log(a)
    btn.parentNode.remove()
    firebase.database().ref(`cart/${a}`).update({
        status: "Accepted"
    })
//     window.location.reload()
// }
}
let bill=()=>{
    window.location="cart.html"
}