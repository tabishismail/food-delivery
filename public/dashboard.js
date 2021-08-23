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
        let storageRef = firebase.storage().ref(`myfolder/todayImages/${file.name}`);

        let uploading = storageRef.put(file)
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
    })

}



firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        let pro = firebase.database().ref(`products`).orderByChild("uid").equalTo(user.uid);
        // console.log(pro)
        pro.on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                console.log(childKey);
                let proTab = document.getElementById("pro-tabi");
                proTab.innerHTML += `
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

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        firebase.database().ref(`resturant/${user.uid}`).once("value", (data) => {
            let profileName = document.getElementById("profileName");
            // profileName.innerHTML = `Welcome ${data.val().resturantName}`
        })
    }
})

// let array = []
// let addToCart=(obj)=>{
//     let dummyArray = [...array]
//     dummyArray.push(obj)
//     array = dummyArray
// console.log(obj)
// firebase.database().ref(`cart/${user.uid}`).set(obj)
// }
// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         let dishesData = firebase.database().ref(`products`).on("child_added",(data)=>{
//             console.log(data.val().itemName)
//             let dishes = document.getElementById("dishes");
//                 dishes.innerHTML += `
//             <div class="card myCard" style="width: 18rem;">
//         <img src="${data.val().pic}" class="card-img-top" alt="...">
//         <div class="card-body">
//           <h5 class="card-title">${data.val().itemName}</h5>
//           <p class="card-text">${data.val().category} </p>
//           <p class="card-text">Price Rs ${data.val().price} </p>
//           <p class="card-text">Type of Delivery ${data.val().delType} </p>
//           <button onclick=${addToCart(data.val())}>Add to Cart</button>       
//         </div>
//     </div> `   
//         });
        
    //     dishesData.on('value', function (snapshot) {
    //         snapshot.forEach(function (childSnapshot) {
    //             var childKey = childSnapshot.key;
    //             var childData = childSnapshot.val();
    //             console.log(childKey);
    //             let dishes = document.getElementById("dishes");
    //             dishes.innerHTML += `
    //         <div class="card myCard" style="width: 18rem;">
    //     <img src="${childData.pic}" class="card-img-top" alt="...">
    //     <div class="card-body">
    //       <h5 class="card-title">${childData.itemName}</h5>
    //       <p class="card-text">${childData.category} </p>
    //       <p class="card-text">Price Rs ${childData.price} </p>
    //       <p class="card-text">Type of Delivery ${childData.delType} </p>          
    //     </div>
    // </div>`
    // }
    //         });
//         });

//     }
// })
let pending=()=>{firebase.auth().onAuthStateChanged((user) => {
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
})}
let pendingOrder=()=>{firebase.auth().onAuthStateChanged((user) => {
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
        </div>
    </div>`
            });
        });

    }
})}