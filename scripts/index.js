const components = {
    header: Header,
    blocks: Blocks,
    content: Content,
    gif: Gif,

};

const routes = {
    registration: RegistrationComponent,
    enter: EnterComponent,
    account: AccountComponent,
    create: CreateComponent,
    allproducts: AllproductsComponent,
    vegetables: VegetablesComponent,
    milk: MilkComponent,
    bread: BreadComponent,
    meat: MeatComponent,
    fish: FishComponent,
    tea: TeaComponent,
    water: WaterComponent,
    pasta: PastaComponent,
    sweets: SweetsComponent,
    createlist: CreateListComponent,
    default: RegistrationComponent,
    error: ErrorComponent
};

const easyGroceries = (function () {

    function ModuleView() {
        let myModuleContainer = null;
        let contentContainer = null;
        let routesObj = null;
        let audio = null;
        let gifImage = null;
        let listHTML = null;

        this.init = function (container, routes) {
            myModuleContainer = container;
            routesObj = routes;
            contentContainer = myModuleContainer.querySelector("#content");
            gifImage = document.querySelector(".gif");
        }
        this.gifBlock = function () {
            gifImage.style.display = "block";
        }
        this.gifNone = function () {
            gifImage.style.display = "none";
        }
        this.updateSoundView = function () {
            audio = new Audio();
            audio.src = 'audio/chirkane-karandashom-na-bumage_pT1EjQHM.mp3';
            audio.autoplay = true;
        }
        this.renderContent = function (hashPageName) {
            let routeName = "";
            const userData = JSON.parse(sessionStorage.getItem("my_firebase_user"));
            if (userData?.user) {
                routeName = "account";
            } else {
                routeName = "default";
            }
            if (hashPageName.length > 0) {

                routeName = hashPageName in routes ? hashPageName : "error";
            }
            window.location.hash = routesObj[routeName].id;
            window.document.title = routesObj[routeName].title;
            contentContainer.innerHTML = routesObj[routeName].render(`${routeName}-page`);
        }
        this.errorMassege = function (error) {
            contentContainer.querySelector(".error").innerHTML = `${error}`;
        };
        this.addLists = function (lists) {
            listHTML = "";
            Object.values(lists).forEach(function (list) {
                listHTML += "<li class='list_item'><a class='list_name'>" + list + "</a><p class='delete_btn' ><a class='delete' title='удалить список'>&#10006;</a></p></li>"
            })
            contentContainer.querySelector("#lists").innerHTML = `${listHTML}`;
        };

        this.addListProductContent = function (lists, nameList) {
            contentContainer.querySelector("#name_list").innerHTML = `${nameList}`;
            listHTML = "";
            for (let i = 0; i < lists.length; i++) {
                listHTML += "<li class='produc_in_store'><a class='listProduct_item'>" + lists[i] + "</a><p class='done_btnProduct'><a class='done_btn' title='Куплено'>&#10004;</a></p></li>"
            }
            contentContainer.querySelector("#list").innerHTML = `${listHTML}`;
        };
        this.updateViewProduct = function (product) {
            product.textContent = "Добавлено!";
            product.classList.add("btn_disabled");
            product.disabled = true;
        };
        this.updateViewNone = function () {
            contentContainer.querySelector("#list").innerHTML = "<li class='back_to_account'><a href='#account' class='back_btn' >Вернуться в личный кабинет</a></li>";
            contentContainer.querySelector("#name_list").innerHTML = "Всё куплено! ";
        }
    }

    function ModuleModel() {
        let myModuleView = null;
        let accountId = null;
        let itemList = [];
        let nameList = "";
        let user = null;
        const that = this;
        this.init = function (view) {
            myModuleView = view;
            const userData = JSON.parse(sessionStorage.getItem("my_firebase_user"));
            if (userData?.user) {
                user = userData?.user;
                accountId = userData.user.uid;
                this.openAccount();
            }
        }

        this.updateState = function (pageName) {
            myModuleView.renderContent(pageName);
        }
        this.sound = function () {
            myModuleView.updateSoundView();
        }
        this.createAccount = function (userEmail, userPass) {
            if (userEmail && userPass) {
                myModuleView.gifBlock();
                auth
                    .createUserWithEmailAndPassword(userEmail, userPass)
                    .then((userCredential) => {
                        myModuleView.gifNone()
                        user = userCredential.user;
                        accountId = user.uid;
                        if (user) {
                            const userData = {
                                user: user,
                                page: document.location.hash || "#registration"
                            }
                            sessionStorage.setItem("my_firebase_user", JSON.stringify(userData));
                            this.openAccount();
                            this.updateState("account");

                        } else {
                            sessionStorage.removeItem("my_firebase_user");
                        }
                    })
                    .catch(function (error) {
                        myModuleView.gifNone();
                        myModuleView.errorMassege(
                            "Неверный email или пароль. Введите корректные данные."
                        );
                    });
            } else {
                myModuleView.errorMassege(
                    "Пустое поле Email или Password. Введите данные в указанные поля."
                );
            }
        }

        this.openAccount = function () {
            if (user) {
                myAppDB.ref("lists/" + `${accountId}`).child("/").get().then((snapshot) => {
                    if (snapshot.exists()) {
                        myModuleView.addLists(Object.keys(snapshot.val()));
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
                this.updateState("account");
            } else {
                this.updateState("enter");
            }
        }
        this.login = function (userEmail, userPass) {
            if (userEmail && userPass) {
                myModuleView.gifBlock();
                auth
                    .signInWithEmailAndPassword(userEmail, userPass)
                    .then((userCredential) => {
                        myModuleView.gifNone()
                        user = userCredential.user;
                        accountId = user.uid;
                        if (user) {
                            const userData = {
                                user: user,
                                page: document.location.hash || "#registration"
                            }
                            sessionStorage.setItem("my_firebase_user", JSON.stringify(userData));
                            this.openAccount();
                            this.updateState("account");

                        } else {
                            sessionStorage.removeItem("my_firebase_user");
                        }
                    })
                    .catch(function (error) {
                        myModuleView.gifNone();
                        myModuleView.errorMassege(
                            "Неверный email или пароль. Введите корректные данные."
                        );
                    });
            } else {
                myModuleView.errorMassege(
                    "Пустое поле Email или Password. Введите данные в указанные поля."
                );
            }
        };

        this.createListName = function (listName) {
            if (listName === '') {
                myModuleView.errorMassege(
                    "Введите название."
                );
            } else {
                nameList = listName;
                this.updateState("allproducts");
            }
        };

        this.logout = function () {
            auth.signOut().then(() => {
                user = null;
                accountId = "";
                sessionStorage.removeItem("my_firebase_user");
                this.updateState("registration");
            });
        };

        this.deleteListName = function (listName) {
            myAppDB
                .ref("lists/" + `${accountId}` + ("/") + listName)
                .remove()
                .then(() => {
                    console.info("Пользователь удален из коллеции lists");
                    this.openAccount()
                })
                .catch(function (error) {
                    console.error("Ошибка удаления пользователя: ", error);
                });
        };

        this.doneGroceries = function (listName, deleteListName) {
            myAppDB
                .ref("lists/" + `${accountId}` + "/" + `${deleteListName}` + "/" + `${listName}`)
                .remove()
                .then(() => {
                    this.getListWithProductStore(deleteListName);

                })
                .catch(function (error) {
                    console.error("Ошибка удаления пользователя: ", error);
                });
        }
        this.getListWithProductStore = function (nameClickList) {
            myAppDB.ref("lists/" + `${accountId}` + "/" + `${nameClickList}` + "/").get().then((snapshot) => {
                if (snapshot.exists()) {
                    this.updateState("createlist");
                    myModuleView.addListProductContent(Object.keys(snapshot.val()), nameClickList);

                } else {
                    myModuleView.updateViewNone();

                }
            }).catch((error) => {
                console.error(error);
            });
        }
        this.addToListVeg = function (contentVeg, veg) {
            if (itemList.length === 0) {
                itemList += "{\"" + contentVeg + "\":" + "\"veg\"";
            } else {
                itemList += ",\"" + contentVeg + "\":" + "\"veg\"";
            }
            myModuleView.updateViewProduct(veg);

        }
        this.addToListMilk = function (contentMilk, milk) {
            if (itemList.length === 0) {
                itemList += "{\"" + contentMilk + "\":" + "\"milk\"";
            } else {
                itemList += ",\"" + contentMilk + "\":" + "\"milk\"";
            }
            myModuleView.updateViewProduct(milk);
        }
        this.addToListBread = function (contentBread, bread) {
            if (itemList.length === 0) {
                itemList += "{\"" + contentBread + "\":" + "\"bread\"";
            } else {
                itemList += ",\"" + contentBread + "\":" + "\"bread\"";
            }
            myModuleView.updateViewProduct(bread);

        }
        this.addToListMeat = function (contentMeat, meat) {
            if (itemList.length === 0) {
                itemList += "{\"" + contentMeat + "\":" + "\"meat\"";
            } else {
                itemList += ",\"" + contentMeat + "\":" + "\"meat\"";
            }
            myModuleView.updateViewProduct(meat);

        }
        this.addToListTea = function (contentTea, tea) {
            if (itemList.length === 0) {
                itemList += "{\"" + contentTea + "\":" + "\"tea\"";
            } else {
                itemList += ",\"" + contentTea + "\":" + "\"tea\"";
            }
            myModuleView.updateViewProduct(tea);

        }
        this.addToListFish = function (contentFish, fish) {
            if (itemList.length === 0) {
                itemList += "{\"" + contentFish + "\":" + "\"fish\"";
            } else {
                itemList += ",\"" + contentFish + "\":" + "\"fish\"";
            }
            myModuleView.updateViewProduct(fish);

        }
        this.addToListWater = function (contentWater, water) {
            if (itemList.length === 0) {
                itemList += "{\"" + contentWater + "\":" + "\"water\"";
            } else {
                itemList += ",\"" + contentWater + "\":" + "\"water\"";
            }
            myModuleView.updateViewProduct(water);

        }
        this.addToListPasta = function (contentPasta, pasta) {
            if (itemList.length === 0) {
                itemList += "{\"" + contentPasta + "\":" + "\"pasta\"";
            } else {
                itemList += ",\"" + contentPasta + "\":" + "\"pasta\"";
            }
            myModuleView.updateViewProduct(pasta);

        }
        this.addToListSweet = function (contentSweet, sweet) {
            if (itemList.length === 0) {
                itemList += "{\"" + contentSweet + "\":" + "\"sweet\"";
            } else {
                itemList += ",\"" + contentSweet + "\":" + "\"sweet\"";
            }
            myModuleView.updateViewProduct(sweet);

        }
        this.createListWithProduct = function () {
            if (itemList.length !== 0) {
                myModuleView.gifBlock();
                itemList += "}";
                myAppDB.ref("lists/" + `${accountId}` + "/" + `${nameList}`)
                    .update(JSON.parse(itemList))
                    .then(() => {
                        itemList = "";
                        myModuleView.gifNone();
                    })
                    .catch(function (error) {
                        myModuleView.errorMassege(
                            "Введите название."
                        );
                    });
                this.updateState("createlist");
                this.openListOfProduct();
            } else {
                alert("Выберете хоть один продукт")
            }
        };
        this.openListOfProduct = function () {
            myAppDB.ref("lists/" + `${accountId}` + "/" + `${nameList}`).child("/").get().then((snapshot) => {
                if (snapshot.exists()) {
                    myModuleView.addListProductContent(Object.keys(snapshot.val()), nameList);
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
        this.getListWithProduct = function (nameClickList) {
            myAppDB.ref("lists/" + `${accountId}` + "/" + `${nameClickList}` + "/").get().then((snapshot) => {
                if (snapshot.exists()) {
                    myModuleView.addListProductContent(Object.keys(snapshot.val()), nameClickList);
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    function ModuleController() {
        let myModuleContainer = null;
        let myModuleModel = null;
        let createEmailInput = null;
        let createPasswordInput = null;
        let enterEmailInput = null;
        let enterPasswordInput = null;
        let createListNameInput = null;
        this.init = function (container, model) {
            myModuleContainer = container;
            myModuleModel = model;
            this.updateState();
            window.addEventListener("hashchange", this.updateState);
            this.addEventListeners();

        }
        this.addEventListeners = function () {
            myModuleContainer.addEventListener("click", function (event) {
                createEmailInput = myModuleContainer.querySelector(".create_login");
                createPasswordInput = myModuleContainer.querySelector(".create_password");
                enterEmailInput = myModuleContainer.querySelector(".enter_login");
                enterPasswordInput = myModuleContainer.querySelector(".enter_password");
                createListNameInput = myModuleContainer.querySelector(".create_input");
                if (event.target && event.target.id === "btn_registration") {
                    event.preventDefault();
                    event.stopPropagation();
                    myModuleModel.createAccount(createEmailInput.value, createPasswordInput.value);
                }
                if (event.target && event.target.id === "btn_enter") {
                    event.preventDefault();
                    event.stopPropagation();
                    myModuleModel.login(enterEmailInput.value, enterPasswordInput.value);

                }
                if (event.target && event.target.id === "btnExit") {
                    event.preventDefault();
                    event.stopPropagation();
                    myModuleModel.logout();
                }
                if (event.target && event.target.className === "create_list_btn") {
                    event.preventDefault();
                    event.stopPropagation();
                    myModuleModel.createListName(createListNameInput.value);
                }
                if (event.target && event.target.className === "milk_elem") {
                    let milk = event.target.closest("[class='milk_elem']")
                    event.preventDefault();
                    event.stopPropagation();
                    myModuleModel.addToListMilk(milk.textContent, milk);
                }
                if (event.target && event.target.className === "vegetables_elem") {
                    let veg = event.target.closest("[class='vegetables_elem']")
                    event.preventDefault();
                    event.stopPropagation();
                    myModuleModel.addToListVeg(veg.textContent, veg);
                }
                if (event.target && event.target.className === "bread_elem") {
                    let bread = event.target.closest("[class='bread_elem']")
                    event.preventDefault();
                    event.stopPropagation();
                    myModuleModel.addToListBread(bread.textContent, bread);
                }
                if (event.target && event.target.className === "meat_elem") {
                    let meat = event.target.closest("[class='meat_elem']")
                    event.preventDefault();
                    event.stopPropagation();
                    myModuleModel.addToListMeat(meat.textContent, meat);
                }
                if (event.target && event.target.className === "fish_elem") {
                    let fish = event.target.closest("[class='fish_elem']")
                    event.preventDefault();
                    event.stopPropagation();
                    myModuleModel.addToListFish(fish.textContent, fish);
                }
                if (event.target && event.target.className === "tea_elem") {
                    let tea = event.target.closest("[class='tea_elem']")
                    event.preventDefault();
                    event.stopPropagation();
                    myModuleModel.addToListTea(tea.textContent, tea);
                }
                if (event.target && event.target.className === "water_elem") {
                    let water = event.target.closest("[class='water_elem']")
                    event.preventDefault();
                    event.stopPropagation();
                    myModuleModel.addToListWater(water.textContent, water);
                }
                if (event.target && event.target.className === "pasta_elem") {
                    let pasta = event.target.closest("[class='pasta_elem']")
                    event.preventDefault();
                    event.stopPropagation();
                    myModuleModel.addToListPasta(pasta.textContent, pasta);
                }
                if (event.target && event.target.className === "sweet_elem") {
                    let sweet = event.target.closest("[class='sweet_elem']")
                    event.preventDefault();
                    event.stopPropagation();
                    myModuleModel.addToListSweet(sweet.textContent, sweet);
                }
                if (event.target && event.target.className === "btnEnterMain") {
                    event.preventDefault();
                    event.stopPropagation();
                    myModuleModel.openAccount();
                }
                if (event.target && event.target.className === ("delete")) {
                    let deleteListName = event.target.closest("li").querySelector('.list_name').textContent;
                    event.preventDefault();
                    event.stopPropagation();
                    myModuleModel.deleteListName(deleteListName);
                    myModuleModel.updateState("account");
                }
                if (event.target && event.target.className === "create_list_all_product") {
                    event.preventDefault();
                    event.stopPropagation();
                    myModuleModel.createListWithProduct();
                }
                if (event.target && event.target.className === "back_btn") {
                    myModuleModel.openAccount();
                    myModuleModel.updateState("account");
                }
                if (event.target && event.target.className === "done_btn") {
                    myModuleModel.sound();
                    event.preventDefault();
                    event.stopPropagation();
                    let deleteListNameProduct = event.target.closest("li").querySelector('.listProduct_item').textContent;
                    let deleteListName = event.target.closest("div").querySelector('.name_list').textContent;
                    myModuleModel.doneGroceries(deleteListNameProduct, deleteListName);
                }
                if (event.target && event.target.className === "list_item") {
                    let nameClickList = event.target.querySelector('.list_name').textContent;
                    myModuleModel.getListWithProduct(nameClickList);
                    myModuleModel.updateState("createlist");
                }
            })
            myModuleContainer.addEventListener("keydown", function (event) {
                if (event.keyCode == 13) {
                    event.preventDefault();
                    event.stopPropagation();
                    myModuleModel.login(enterEmailInput.value, enterPasswordInput.value);
                }
            });

        }
        this.updateState = function () {
            const hashPageName = location.hash.slice(1).toLowerCase();
            myModuleModel.updateState(hashPageName);
        }
    }

    return {
        init: function ({container, routes, components}) {
            this.renderComponents(container, components);

            const view = new ModuleView();
            const model = new ModuleModel();
            const controller = new ModuleController();


            view.init(document.getElementById(container), routes);
            model.init(view);
            controller.init(document.getElementById(container), model);
        },

        renderComponents: function (container, components) {
            const root = document.getElementById(container);
            const componentsList = Object.keys(components);
            for (let item of componentsList) {
                root.innerHTML += components[item].render("component");
            }
        },
    };

})();

document.addEventListener("DOMContentLoaded", easyGroceries.init({
    container: "app",
    routes: routes,
    components: components
}));
