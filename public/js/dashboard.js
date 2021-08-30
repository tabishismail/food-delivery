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
            price: "Rs :"+price.value,
            pic: image,
            status: "pending",
            uid: uid,
        })
        document.getElementById("close").click();
        window.location.reload();
    })

}



let product = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let pro = firebase.database().ref(`products`).orderByChild("uid").equalTo(user.uid);
            let count=1;
            pro.on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    let proTable=document.getElementById("proTable");
                proTable.innerHTML+=`
                <tr>
                                <th id="sNo">${count}</th>
                                <td class="align-self-center"><img src="${childData.pic}" style="width: 50px; border-radius: 100px;" alt=""></td>
                                <td class="align-self-center">${childData.itemName}</td>
                                <td class="align-self-center">${childData.category}</td>
                                <td class="align-self-center">${childData.price}</td>
                                <td class="align-self-center">${childData.delType}</td>
                                <td class="align-self-center"><button type="button" class="btn myBtn" data-toggle="modal" data-target="#editProducts" onclick="edit('${childKey}')">Edit</button></td>
                              </tr>`
                              count++;
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
            document.getElementById("close1").click();
        window.location.reload();
        }
    }

    )

}


let pending = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let pro = firebase.database().ref(`cart/pending/`).orderByChild("status").equalTo("pending");
            console.log(pro);
            let userPendingOrders1 = document.getElementById("userPendingOrders");
            userPendingOrders1.innerHTML = "";
            pro.on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    console.log(childKey);
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
let userAccept= () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let pro = firebase.database().ref(`cart/accept/`).orderByChild("status").equalTo("Accepted");
            console.log(pro);
            let userAcceptOrders = document.getElementById("userAcceptOrders");
            userAcceptOrders.innerHTML = "";
            pro.on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    console.log(childKey);
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

let userComplete= () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let pro = firebase.database().ref(`cart/delivered/`).orderByChild("status").equalTo("Delivered");
            console.log(pro);
            let userCompleteOrders = document.getElementById("userCompleteOrders");
            userCompleteOrders.innerHTML = "";
            pro.on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    console.log(childKey);
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
            let pro = firebase.database().ref(`cart/pending/`).orderByChild("uid").equalTo(user.uid);
            let count=1;
            let pendingTable = document.getElementById("pendingTable");
            // pendingOrder1.innerHTML=""
            pro.on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    console.log(childData.catergory);
                //     pendingTable.innerHTML += `
                //     <div class="card border-danger mb-3" style="max-width: 18rem;">
                //     <img src="${childData.pic}" class="card-img-top" alt="...">
                //     <div class="card-header">${childData.itemName}</div>
                //     <div class="card-body text-dark">
                //       <p class="card-text"><strong>Catergory :</strong>${childData.catergory} </p>
                //       <p class="card-text"><strong>Price Rs :</strong>${childData.price} </p>
                //       <p class="card-text"><strong>Type of Delivery :</strong>${childData.delType} </p>
                //       <p class="card-text"><strong>Status :</strong>${childData.status} </p>
                //       <button class="btn myBtn" onclick="accept('${childKey}','${childData.pic}','${childData.itemName}','${childData.catergory}','${childData.price}','${childData.delType}','${childData.uid}')" >Accept</button>                                  
                //     </div>
                // </div>`
                pendingTable.innerHTML+=`
                <tr>
                                <th id="sNo">${count}</th>
                                <td class="align-self-center"><img src="${childData.pic}" style="width: 50px; border-radius: 100px;" alt=""></td>
                                <td class="align-self-center">${childData.itemName}</td>
                                <td class="align-self-center">${childData.catergory}</td>
                                <td class="align-self-center">${childData.price}</td>
                                <td class="align-self-center">${childData.delType}</td>
                                <td class="align-self-center">${childData.status}</td>
                                <td class="align-self-center"><button class="btn-success myTableBtn" onclick="accept('${childKey}','${childData.pic}','${childData.itemName}','${childData.catergory}','${childData.price}','${childData.delType}','${childData.uid}')">Accept</button>
                                <button class="btn-danger myTableBtn" onclick="reject('${childKey}','${childData.pic}','${childData.itemName}','${childData.catergory}','${childData.price}','${childData.delType}','${childData.uid}')">Reject</button></td>
                              </tr>
                
                `
                count++
                });
            });

        }
    })
}
let acceptOrder = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let pro = firebase.database().ref(`cart/accept/`).orderByChild("uid").equalTo(user.uid);
            let count=1;
            let acceptTable = document.getElementById("acceptTable");
            pro.on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    console.log(childData.catergory);
               
                acceptTable.innerHTML+=`
                <tr>
                                <th id="sNo">${count}</th>
                                <td class="align-self-center"><img src="${childData.pic}" style="width: 50px; border-radius: 100px;" alt=""></td>
                                <td class="align-self-center">${childData.itemName}</td>
                                <td class="align-self-center">${childData.catergory}</td>
                                <td class="align-self-center">${childData.price}</td>
                                <td class="align-self-center">${childData.delType}</td>
                                <td class="align-self-center">${childData.status}</td>
                                <td class="align-self-center"><button class="btn-success myTableBtn" onclick="delivered('${childKey}','${childData.pic}','${childData.itemName}','${childData.catergory}','${childData.price}','${childData.delType}','${childData.uid}')">Delivered</button>
                                
                              </tr>
                
                `
                count++
                });
            });

        }
    })
}

let rejectOrder = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let pro = firebase.database().ref(`cart/reject/`).orderByChild("uid").equalTo(user.uid);
            let count=1;
            let rejectTable = document.getElementById("rejectTable");
            pro.on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    console.log(childData.catergory);
                rejectTable.innerHTML+=`
                <tr>
                                <th id="sNo">${count}</th>
                                <td class="align-self-center"><img src="${childData.pic}" style="width: 50px; border-radius: 100px;" alt=""></td>
                                <td class="align-self-center">${childData.itemName}</td>
                                <td class="align-self-center">${childData.catergory}</td>
                                <td class="align-self-center">${childData.price}</td>
                                <td class="align-self-center">${childData.delType}</td>
                                <td class="align-self-center">${childData.status}</td>
                               
                              </tr>
                
                `
                count++
                });
            });

        }
    })
}
let deliveredOrder = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let pro = firebase.database().ref(`cart/delivered/`).orderByChild("uid").equalTo(user.uid);
            let count=1;
            let deliveredTable = document.getElementById("deliveredTable");
            pro.on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    // console.log(childData.catergory);
                    deliveredTable.innerHTML+=`
                <tr>
                                <th id="sNo">${count}</th>
                                <td class="align-self-center"><img src="${childData.pic}" style="width: 50px; border-radius: 100px;" alt=""></td>
                                <td class="align-self-center">${childData.itemName}</td>
                                <td class="align-self-center">${childData.catergory}</td>
                                <td class="align-self-center">${childData.price}</td>
                                <td class="align-self-center">${childData.delType}</td>
                                <td class="align-self-center">${childData.status}</td>
                               
                              </tr>
                
                `
                count++
                });
            });

        }
    })
}


let accept=(a,b,c,d,e,f,g)=>{
console.log(a,b,c,d,e,f,g)
firebase.database().ref(`cart/pending/${a}`).remove()

firebase.database().ref(`cart/accept`).push({
    pic:b,
    itemName:c,
    catergory:d,
    price:e,
    delType:f,
    uid:g,
    status:"Accepted"
})
window.location.reload()
}
let delivered=(a,b,c,d,e,f,g)=>{
    console.log(a,b,c,d,e,f,g)
    firebase.database().ref(`cart/accept/${a}`).remove()   
    firebase.database().ref(`cart/delivered`).push({
        pic:b,
        itemName:c,
        catergory:d,
        price:e,
        delType:f,
        uid:g,
        status:"Delivered"
    })
    window.location.reload()
    }

let reject=(a,b,c,d,e,f,g)=>{
    console.log(a,b,c,d,e,f,g)
    firebase.database().ref(`cart/pending/${a}`).remove()
    firebase.database().ref(`cart/reject`).push({
        pic:b,
        itemName:c,
        catergory:d,
        price:e,
        delType:f,
        uid:g,
        status:"Rejected"
    })
    window.location.reload()
}

let bill=()=>{
    window.location="cart.html"
}