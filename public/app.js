// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//                 window.location = "rest-dash.html";
//         // firebase.database().ref(`resturant/${user.uid}`).once("value", (user) => {
//         //     if (user.val()) {
//         //     } else {
//         //         window.location = "profile.html"
//         //     }   

//         // })
//         // var uid = user.uid;
//         // ...
//     }
//     else {
//         window.location="index.html"
//     }
// });




let signup = () => {
    window.location = "signup.html"
}
let business = () => {
    window.location = "resturant-signup.html"
}
let home = () => {
    window.location = "index.html"
}
let login = () => {
    window.location = "login.html"
}
let register = () => {
    let userName = document.getElementById('userName');
    let phone = document.getElementById('phone');
    let country = document.getElementById('country');
    let city = document.getElementById('city');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let empty = /.*\S.*/;
    let emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let passwordRegx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm
    // let id = firebase.database().ref(`users/${uid}`).set();
    let loader = document.getElementById('loader');
    let loaderText = document.getElementById("loaderText");
    let data = {
        userName: userName.value,
        phone: phone.value,
        country: country.value,
        city: city.value,
        email: email.value,
        password: password.value,
        role: "customer"
    }
    if (empty.test(userName.value)) {
        if (empty.test(phone.value)) {
            if (empty.test(country.value)) {
                if (empty.test(city.value)) {
                    if (emailRegx.test(email.value)) {
                        if (passwordRegx.test(password.value)) {
                            loader.style.display = "block"
                            loaderText.style.display = "none"
                            firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
                                .then((userCredential) => {
                                    var user = userCredential.user;
                                    firebase.database().ref(`customers/${user.uid}`).set(data)
                                        .then(() => {
                                            loader.style.display = "none"
                                            loaderText.style.display = "block"
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Success',
                                                text: 'Registeration complete successfully'
                                            })
                                            setTimeout(() => {
                                                location.href = "login.html"
                                            }, 3000)

                                        })
                                })
                                .catch((error) => {
                                    loader.style.display = "none"
                                    loaderText.style.display = "block"
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: `${error.message}`
                                    });
                                });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Enter Correct Password!'
                            })
                        }
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Enter City!'
                    })
                };
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Enter Country!'
                })
            }

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Enter Phone!'
            })

        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Enter User Name!'
        })

    }

};

let regis = () => {
    let resturantName = document.getElementById('resturantName');
    let phone = document.getElementById('phone');
    let country = document.getElementById('country');
    let city = document.getElementById('city');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let empty = /.*\S.*/;
    let emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let passwordRegx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm
    // let id = firebase.database().ref(`users/${uid}`).set();
    let loader = document.getElementById('loader');
    let loaderText = document.getElementById("loaderText");
    let data = {
        resturantName: resturantName.value,
        phone: phone.value,
        country: country.value,
        city: city.value,
        email: email.value,
        password: password.value,
        role: 'owner'
    }
    if (empty.test(resturantName.value)) {
        if (empty.test(phone.value)) {
            if (empty.test(country.value)) {
                if (empty.test(city.value)) {
                    if (emailRegx.test(email.value)) {
                        if (passwordRegx.test(password.value)) {
                            loader.style.display = "block"
                            loaderText.style.display = "none"
                            firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
                                .then((userCredential) => {
                                    var user = userCredential.user;
                                    firebase.database().ref(`resturant/${user.uid}`).set(data)
                                        .then(() => {
                                            loader.style.display = "none"
                                            loaderText.style.display = "block"
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Success',
                                                text: 'Registeration complete successfully'
                                            })
                                            setTimeout(() => {
                                                location.href = "login.html"
                                            }, 3000)

                                        })
                                })
                                .catch((error) => {
                                    loader.style.display = "none"
                                    loaderText.style.display = "block"
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: `${error.message}`
                                    });
                                });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Enter Correct Password!'
                            })
                        }
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Enter City!'
                    })
                };
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Enter Country!'
                })
            }

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Enter Phone!'
            })

        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Enter resturant Name!'
        })

    }

};

let signin = () => {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let loader = document.getElementById('loader');
    let loaderText = document.getElementById("loaderText");
    loader.style.display = "block"
    loaderText.style.display = "none"
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            loader.style.display = "none"
            loaderText.style.display = "block"
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Log in Successfully'
            })
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    firebase.database().ref(`resturant/${user.uid}`).once("value", (user) => {
                        if (user.val()) {
                            window.location = "rest-dash.html";
                        } else {
                            window.location = "profile.html"
                        }
                    })
                    // var uid = user.uid;
                    // ...
                }
                else {
                    // User is signed out
                    // ...
                }
            });

        })

        .catch((error) => {

            loader.style.display = "none"
            loaderText.style.display = "block"
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.message}`
            })

        });
}

let loginPage = () => {
    let loginBtn = document.getElementById("login-Btn");
    let logOutBtn = document.getElementById("logOut-Btn");
    let signUpBtn = document.getElementById("signupBtn");

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref(`resturant/${user.uid}`).once("value", (user) => {
                if (user.val()) {
                    window.location = "rest-dash.html";
                } else {
                    window.location = "profile.html"
                }
            })
        }
        else {
            // User is signed out
            loginBtn.style.display = "none";
            logOutBtn.style.display = "none"
            signUpBtn.style.display = "block"
            // ...
        }
    })


}


let addToCart = (a,b,c,d,e,f,g, key) => {
    console.log(a,b,c,d,e,f,g,key)
    
    firebase.database().ref(`cart`).push({
        pic:a,
        itemName:b,
        catergory:c,
        price:d,
        delType:e,
        uid:f,
        custUid:key,
        status:g
    })
    // firebase.database().ref(`cart/${user}`).update(obj)
}


let index = () => {
    firebase.auth().onAuthStateChanged((user) => {
        let loginBtn = document.getElementById("login-Btn");
        let logOutBtn = document.getElementById("logOut-Btn");
        let signUpBtn = document.getElementById("signupBtn");
        let signUpBtn2 = document.getElementById("signupBtn2");
        let userProfile = document.getElementById("userProfile");
        let dashboard = document.getElementById("dashboard");
        let bill = document.getElementById("bill");

        if (user) {
            let cust=user.uid;
            console.log(cust)
            firebase.database().ref(`resturant/${user.uid}`).once("value", (user) => {
                if (user.val()) {
                    dashboard.style.display = "block";
                    userProfile.style.display = "none";
                    bill.style.display="none"
                    firebase.database().ref(`products`).on("child_added", (data) => {
                        console.log(data.val().itemName)
                        let dishes = document.getElementById("dishes");
                        dishes.innerHTML += `
                    <div class="card border-light mb-3" style="max-width: 18rem;">
                    <img src="${data.val().pic}" class="card-img-top" alt="...">
                    <div class="card-header">${data.val().itemName}</div>
                    <div class="card-body text-dark">
                    <p class="card-text"><strong>Catergory :</strong>${data.val().category} </p>
                    <p class="card-text"><strong>Price Rs :</strong>${data.val().price} </p>
                    <p class="card-text"><strong>Type of Delivery :</strong>${data.val().delType} </p>       
                    </div>
                    </div> `})

                } else {
                    dashboard.style.display = "none";
                    userProfile.style.display = "block";
                    bill.style.display="block"
                    firebase.database().ref(`products`).on("child_added", (data) => {
                        let dishes = document.getElementById("dishes");
                        let key=user.key
                        dishes.innerHTML += `
                        <div class="card border-light mb-3" style="max-width: 18rem;">
                        <img src="${data.val().pic}" class="card-img-top" alt="...">
                        <div class="card-header">${data.val().itemName}</div>
                        <div class="card-body text-dark">
                          <p class="card-text"><strong>Catergory :</strong>${data.val().category} </p>
                          <p class="card-text"><strong>Price Rs :</strong>${data.val().price} </p>
                          <p class="card-text"><strong>Type of Delivery :</strong>${data.val().delType} </p>       
                          <button class=""myBtn indexSignup" onclick="addToCart('${data.val().pic}','${data.val().itemName}','${data.val().category}','${data.val().price}','${data.val().delType}','${data.val().uid}','${data.val().status}','${key}')">Add to Cart</button>       
                        </div>
                    </div>`
               })
                }
            })
            loginBtn.style.display = "none";
            logOutBtn.style.display = "block"
            signUpBtn.style.display = "none"
            signUpBtn2.style.display = "none"
            
        }
        else {
            // User is signed out
            dashboard.style.display = "none";
            userProfile.style.display = "none";
            loginBtn.style.display = "block";
            logOutBtn.style.display = "none"
            signUpBtn.style.display = "block"
            signUpBtn2.style.display = "block"
            bill.style.display="none"
            firebase.database().ref(`products`).on("child_added", (data) => {
                console.log(data.val().itemName)
                let dishes = document.getElementById("dishes");
                dishes.innerHTML += `
                <div class="card border-light mb-3" style="max-width: 18rem;">
                <img src="${data.val().pic}" class="card-img-top" alt="...">
                <div class="card-header">${data.val().itemName}</div>
                <div class="card-body text-dark">
                <p class="card-text"><strong>Catergory :</strong>${data.val().category} </p>
                <p class="card-text"><strong>Price Rs :</strong>${data.val().price} </p>
                <p class="card-text"><strong>Type of Delivery :</strong>${data.val().delType} </p>      
                  <button class="myBtn indexSignup" data-toggle="modal" data-target="#exampleModal">Add to Cart</button>       
                </div>
            </div> `
          
          
                 
        })
            
            // ...
        }
    }
    )
}

let userProfile=()=>{
    window.location="profile.html"
}

let restDash = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref(`resturant/${user.uid}`).once("value", (data) => {
                let profileName = document.getElementById("profileName");
                profileName.innerHTML = `Welcome TO ${data.val().resturantName}`
                let loginBtn = document.getElementById("login-Btn");
                let logOutBtn = document.getElementById("logOut-Btn");
                let signUpBtn = document.getElementById("signupBtn");
                let signUpBtn2 = document.getElementById("signupBtn2");
                loginBtn.style.display = "none";
                logOutBtn.style.display = "block"
                signUpBtn.style.display = "none"
                product()
            })
        }
        else {
            // User is signed out
            loginBtn.style.display = "block";
            logOutBtn.style.display = "none"
            signUpBtn.style.display = "block"
            // ...
        }
    }
    )
}

let dashboard=()=>{
    window.location="rest-dash.html"
}

let profilePage=()=>{
    let loginBtn = document.getElementById("login-Btn");
    let logOutBtn = document.getElementById("logOut-Btn");
    let signUpBtn = document.getElementById("signupBtn");

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref(`resturant/${user.uid}`).once("value", (user) => {
                if (user.val()) {
                    window.location = "rest-dash.html";
                } else {
                    loginBtn.style.display = "none";
                    logOutBtn.style.display = "block"
                    signUpBtn.style.display = "none"
                }
            })
        }
        else {
            window.location="login.html"
        }
    })


}
