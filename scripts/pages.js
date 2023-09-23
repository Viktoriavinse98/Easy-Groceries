const RegistrationComponent = {
    id: "registration",
    title: "Регистрация",
    render: (className = "container", ...rest) => {
        return `
<form class="${className}">
<fieldset class="create-account-form">
<p class="text-create-account-header">Регистрация</p>
<input class="create_login" type="text" placeholder="E-mail">
<input class="create_password" type="password" placeholder="Пароль">
<p  class="error"></p>
<a class="btn_registration" id="btn_registration" href="#account">Зарегистрироваться</a>
<p class="text_create">Уже есть аккаунт?</p>
<a class="btn_create"href="#enter">Войти</a></fieldset>
</form>'
`;
    }
};

const EnterComponent = {
    id: "enter",
    title: "Вход",
    render: (className = "container", ...rest) => {
        return `
<form class="${className}">
<fieldset class="enter-account-form">
<p class="text-enter-account-header">Вход</p>
<input class="enter_login" type="text" placeholder="E-mail">
<input class="enter_password" type="password" placeholder="Пароль">
<p class="error"></p>
<a class="btn_enter_from_enter_modal" id="btn_enter" href="#account">Войти</a>
<p class="text_enter">Ещё нет аккаунта?</p>
<a class="btn_registration_from_enter_modal"href="#registration">Зарегистрироваться</a>
</fieldset>
</form>
`;
    }
};
const AccountComponent = {
    id: "account",
    title: "Вход",
    render: (className = "container", ...rest) => {
        return `
<div class="${className}">
<div class="account">
<p class="all_product_header">Личный кабинет</p>
<div class="account_conteiner"><p class="my_lists">Мои списки:</p>
<a class="account_btn" title="Добавить новый список" href="#create">+</a>
<ul id="lists" class="lists"></ul>
</div>

</div>
</div>
`;
    }
};


const CreateComponent = {
    id: "create",
    title: "Создание названия списка",
    render: (className = "container", ...rest) => {
        return `
<div class="${className}">
<div class="create_list">
<p class="create_list_header">Создание списка</p>
<input class="create_input" type="text" placeholder="Название">
<p  class="error"></p>
<a class="create_list_btn" href="#allproducts">Создать список</a>
</div>
</div>
`;
    }
};

const AllproductsComponent = {
    id: "allproducts",
    title: "Создание списка",
    render: (className = "container", ...rest) => {
        return `
<div class="${className}">
<div class="all_product">
<p class="all_product_header">Общий список продуктов</p>
<a class="product_elem" href="#vegetables">Овощи и фрукты</a>
<a class="product_elem"href="#milk">Молоко, яйца</a>
<a class="product_elem"href="#bread">Хлеб, выпечка</a>
<a class="product_elem"href="#meat">Мясо</a>
<a class="product_elem"href="#fish">Рыба</a>
<a class="product_elem"href="#tea">Кофе, чай</a>
<a class="product_elem"href="#water">Вода, напитки</a>
<a class="product_elem"href="#pasta">Крупы, макароны, сахар</a>
<a class="product_elem"href="#sweets">Сладости</a>
<a class="create_list_all_product"href="#createlist">Создать список</a>
</div>
</div>
`;
    }
};


const VegetablesComponent = {
    id: "vegetables",
    title: "Овощи и фрукты",
    render: (className = "container", ...rest) => {
        return `
<div class="${className}">
<div class="vegetables">
<p class="all_product_header">Овощи и фрукты</p>
<div class="vegetables_container">
<button class="vegetables_elem">Баклажаны</button>
<button class="vegetables_elem">Кабачки</button>
<button class="vegetables_elem">Капуста</button>
<button class="vegetables_elem">Картофель</button>
<button class="vegetables_elem">Лук</button>
<button class="vegetables_elem">Морковь</button>
<button class="vegetables_elem">Огурцы</button>
<button class="vegetables_elem">Перцы</button>
<button class="vegetables_elem">Помидоры</button>
<button class="vegetables_elem">Арбуз</button>
<button class="vegetables_elem">Апельсины</button>
<button class="vegetables_elem">Бананы</button>
<button class="vegetables_elem">Виноград</button>
<button class="vegetables_elem">Груша</button>
<button class="vegetables_elem">Киви</button>
<button class="vegetables_elem">Лимоны</button>
<button class="vegetables_elem">Манго</button>
<button class="vegetables_elem">Яблоки</button>
<button class="vegetables_elem">Мандарины</button>
<button class="vegetables_elem">Персики</button>
</div>
<a class="vegetables_btn" title="Назад" href="#allproducts">&#129040;</a>
</div>
</div>
`;
    }
};


const MilkComponent = {
    id: "milk",
    title: "Молоко",
    render: (className = "container", ...rest) => {
        return `
<div class="${className}">
<div class="milk">
<p class="all_product_header">Молоко, яйца</p>
<div class="milk_container"><button class="milk_elem">Молоко</button>
<button class="milk_elem">Кефир</button>
<button class="milk_elem">Сливки</button>
<button class="milk_elem">Сметана</button>
<button class="milk_elem">Творог</button>
<button class="milk_elem">Йогурт</button>
<button class="milk_elem">Сыр</button>
<button class="milk_elem">Ряженка</button>
<button class="milk_elem">Простокваша</button>
<button class="milk_elem">Яйца</button>
</div>
<a class="milk_btn" title="Назад" href="#allproducts">&#129040;</a></div>
</div>
`;
    }
};

const BreadComponent = {
    id: "bread",
    title: "Хлеб",
    render: (className = "container", ...rest) => {
        return `
<div class="${className}">
<div class="bread">
<p class="all_product_header">Хлеб, выпечка</p>
<div class="bread_container">
<button class="bread_elem">Хлеб</button>
<button class="bread_elem">Багет</button> 
<button class="bread_elem">Батон</button>
<button class="bread_elem">Лаваш</button>
<button class="bread_elem">Лепешка</button>
<button class="bread_elem">Коржи</button>
<button class="bread_elem">Торт</button> 
<button class="bread_elem">Пирожное</button>
<button class="bread_elem">Сушки</button>
<button class="bread_elem">Пряники</button>
<button class="bread_elem">Пицца</button>
<button class="bread_elem">Булочка</button>
<button class="bread_elem">Сухари</button> 
<button class="bread_elem">Коврижки</button>
</div>
<a class="bread_btn" title="Назад"href="#allproducts">&#129040;</a>
</div>
</div>
`;
    }
};



const MeatComponent = {
    id: "meat",
    title: "Мясо",
    render: (className = "container", ...rest) => {
        return `
<div class="${className}">
<div class="meat">
<p class="all_product_header">Мясо</p>
<button class="meat_elem">Свинина</button>
<button class="meat_elem">Птица</button>
<button class="meat_elem">Говядина</button>
<button class="meat_elem">Колбаса</button>
<button class="meat_elem">Шашлык</button>
<button class="meat_elem">Котлеты</button>
<button class="meat_elem">Биточки</button>
<button class="meat_elem">Сыровяленое мясо</button>
<a class="meat_btn" title="Назад" href="#allproducts">&#129040;</a>
</div>
</div>
`;
    }
};

const FishComponent = {
    id: "fish",
    title: "Рыба",
    render: (className = "container", ...rest) => {
        return `
<div class="${className}">
<div class="fish">
<p class="all_product_header">Рыба</p>
<div class="fish_container">
<button class="fish_elem">Рыба</button>
<button class="fish_elem">Креветки</button>
<button class="fish_elem">Мидии</button>
<button class="fish_elem">Кальмары</button>
<button class="fish_elem">Осьминоги</button>
<button class="fish_elem">Морская капуста</button>
<button class="fish_elem">Крабовые палочки</button>
<button class="fish_elem">Сушеная рыба</button>
<button class="fish_elem">Рыба копченая</button>
<button class="fish_elem">Рыба соленая</button>
</div>
<a class="fish_btn" title="Назад" href="#allproducts">&#129040;</a>
</div>
</div>
`;
    }
};


const TeaComponent = {
    id: "tea",
    title: "Чай",
    render: (className = "container", ...rest) => {
        return `
<div class="${className}">
<div class="tea">
<p class="all_product_header">Кофе, чай</p>
<button class="tea_elem">Чай</button>
<button class="tea_elem">Кофе</button>
<button class="tea_elem">Какао</button>
<a class="tea_btn" title="Назад" href="#allproducts">&#129040;</a>
</div>
</div>
`;
    }
};

const WaterComponent = {
    id: "water",
    title: "Вода",
    render: (className = "container", ...rest) => {
        return `
<div class="${className}">
<div class="water">
<p class="all_product_header">Вода, напитки</p>
<button class="water_elem">Вода газированная</button> 
<button class="water_elem">Вода минеральная</button> 
<button class="water_elem">Вода негазированная</button> 
<button class="water_elem">Квас</button> 
<button class="water_elem">Сок</button> 
<button class="water_elem">Энергетик</button> 
<button class="water_elem">Нектар</button> 
<a class="water_btn" title="Назад" href="#allproducts">&#129040;</a></div>
</div>
`;
    }
};


const PastaComponent = {
    id: "pasta",
    title: "Крупа",
    render: (className = "container", ...rest) => {
        return `
<div class="${className}">
<div class="pasta">
<p class="all_product_header">Крупы, макароны, сахар</p>
<div class="pasta_container">
<button class="pasta_elem">Рис</button>
<button class="pasta_elem">Крупа гречневая</button>
<button class="pasta_elem">Манка</button>
<button class="pasta_elem">Пшено</button>
<button class="pasta_elem">Макароны</button>
<button class="pasta_elem">Хлопья</button>
<button class="pasta_elem">Мюсли</button>
<button class="pasta_elem">Мука</button>
<button class="pasta_elem">Сахар</button>
<button class="pasta_elem">Соль</button>
</div>
<a class="pasta_btn" title="Назад" href="#allproducts">&#129040;</a>
</div>
</div>
`;
    }
};


const SweetsComponent = {
    id: "sweets",
    title: "Сладости",
    render: (className = "container", ...rest) => {
        return `
<div class="${className}">
<div class="sweet">
<p class="all_product_header">Сладости</p>
<div class="sweet_container">
<button class="sweet_elem">Торт</button>
<button class="sweet_elem">Пирожное</button>
<button class="sweet_elem">Маффин</button>
<button class="sweet_elem">Печенье</button>
<button class="sweet_elem">Вафли</button>
<button class="sweet_elem">Шоколад</button>
<button class="sweet_elem">Зефир</button>
<button class="sweet_elem">Мармелад</button>
<button class="sweet_elem">Конфеты</button>
</div>
<a class="sweet_btn" title="Назад" href="#allproducts">&#129040;</a>
</div>
</div>
`;
    }
};
const CreateListComponent = {
    id: "createlist",
    title: "Создание списка",
    render: (className = "container", ...rest) => {
        return `
<div class="${className}">
<div class="product_list">
<p class="all_product_header">Список продуктов в магазин</p>
<p id="name_list" class="name_list"></p>
<ul id="list" class="list"></ul>
</div>
</div>
`;
    }
};


const ErrorComponent = {
    id: "error",
    title: "Achtung, warning, kujdes, attenzione, pozornost...",
    render: (className = "container", ...rest) => {
        return `
<section class="${className}">
<h2>Ошибка 404</h2>
<p>Страница не найдена, попробуйте вернуться на <a href="#registration" class="error_massege">главную</a>.</p>
</section>
`;
    }
};