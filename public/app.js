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

let chxk=()=>{
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
         let loginBtn=document.getElementById("login-Btn");
         let logOutBtn=document.getElementById("logOut-Btn");
         let signUpBtn=document.getElementById("signupBtn");
         let signUpBtn2=document.getElementById("signupBtn2");
         loginBtn.style.display="none";
         logOutBtn.style.display="block"
         signUpBtn.style.display="none"
         signUpBtn2.style.display="none" 
         
         
        }
    else {
        // User is signed out
        loginBtn.style.display="block";
        logOutBtn.style.display="none"
        signUpBtn.style.display="block"
        signUpBtn2.style.display="block"
        // ...
    }
    })
        

}

let array = []
let addToCart=(obj,user)=>{
    let dummyArray = [...array]
    dummyArray.push(obj)
    array = dummyArray
console.log(obj)
firebase.database().ref(`cart/${user.uid}`).set(obj)
}

let dishes=()=>{firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        let dishesData = firebase.database().ref(`products`).on("child_added",(data)=>{
            console.log(data.val().itemName)
            let dishes = document.getElementById("dishes");
                dishes.innerHTML += `
            <div class="card myCard" style="width: 18rem;">
        <img src="${data.val().pic}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${data.val().itemName}</h5>
          <p class="card-text">${data.val().category} </p>
          <p class="card-text">Price Rs ${data.val().price} </p>
          <p class="card-text">Type of Delivery ${data.val().delType} </p>
          <button onclick=${addToCart(data.val(),user)}>Add to Cart</button>       
        </div>
    </div> `   
        });}})}