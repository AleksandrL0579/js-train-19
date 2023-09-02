// 1. Створення базового об'єкту "Book":
/*
 * Об'єкт: Book
 * Властивості:
 * ----------------------------------
 * | Властивість | Значення         |
 * |-------------|------------------|
 * | title       | "Загальна Книга" |
 * | author      | "Анонім"         |
 * | pages       | 0                |
 *
 * Функції:
 * ------------------------------------------------------------------------
 * | Функція    | Опис                                                    |
 * -----------------------------------------------------------------------
 * | read()     | Виводить повідомлення "Ви читаєте <title> від <author>" |
 */

// Створюємо об'єкт Book

console.log("Завдання: 1 ==============================");
function Book() {
  this.title = "Загальна Книга";
  this.author = "Анонім";
  this.pages = 0;
}
Book.prototype.read = function () {
  console.log(`Ви читаєте ${this.title} від ${this.author}`);
};
Book.prototype.toString = function () {
  return `{ title: '${this.title}', author: '${this.author}', pages: ${this.pages}, read: [Function (read)] }`;
};
const myBook = new Book();
console.log("Об'єкт: Book", myBook.toString());
console.log(
  myBook.toString() ===
    `{ title: 'Загальна Книга', author: 'Анонім', pages: 0, read: [Function (read)] }`
);
myBook.read();

// Виводимо в консоль Об'єкт: Book

// Виводимо в консоль прототип Об'єкту: Book

// Викликаємо функцію read об'єкту Book

// 2. Наслідування від базового об'єкту Book

/*
 * Об'єкт: Novel
 * Властивості та функції наслідуються від об'єкта Book
 * Додаємо нову властивість
 *  | Властивість | Значення |
 *  |-------------|----------|
 *  | genre       | "Новела" |
 */

// Створюємо об'єкт Novel, наслідуємо властивості і функції від об'єкта Book

// Додаємо властивість genre

console.log("Завдання: 2 ==============================");
function Book() {
  this.title = "Загальна Книга";
  this.author = "Анонім";
  this.pages = 0;
}
Book.prototype.read = function () {
  console.log(`Ви читаєте ${this.title} від ${this.author}`);
};
function Novel() {
  Book.call(this);
  this.genre = "Новела";
}
Novel.prototype = Object.create(Book.prototype);
Novel.prototype.constructor = Novel;
const myNovel = new Novel();
console.log("Об'єкт: Novel", myNovel);
console.log("Прототип об'єкту: Novel", Object.getPrototypeOf(myNovel));
// Виводимо в консоль Об'єкт: Novel

// Виводимо в консоль прототип Об'єкту: Novel

// 3. Створення нового об'єкту та зміна його прототипу

/*
 * Об'єкт: Biography
 * Властивості:
 * --------------------------------------
 * | Властивість | Значення             |
 * |-------------|----------------------|
 * | title       | "Загальна Біографія" |
 * | author      | "Біограф"            |
 * | pages       | 200                  |
 */

// Створюємо об'єкт Biography

// Змінемо прототип об'єкта Biography на Novel

console.log("Завдання: 3 ==============================");
function Book() {
  this.title = "Загальна Книга";
  this.author = "Анонім";
  this.pages = 0;
}
Book.prototype.read = function () {
  console.log(`Ви читаєте ${this.title} від ${this.author}`);
};
function Novel() {
  Book.call(this);
  this.genre = "Новела";
}
Novel.prototype = Object.create(Book.prototype);
Novel.prototype.constructor = Novel;
function Biography() {
  this.title = "Загальна Біографія";
  this.author = "Біограф";
  this.pages = 200;
}
Biography.prototype = new Novel();
const myBiography = new Biography();
console.log(myBiography);
console.log(myBiography instanceof Novel);
// Виводимо в консоль Об'єкт: Biography

// Перевіримо чи являється Novel прототипом Biography та виведемо в консоль

// 4. Інкапсуляція властивості та додання властивості
/*
 * Об'єкт: ScienceBook
 * Властивості та функції наслідуються від об'єкта Book
 * Також тут використовується інкапсуляція для створення властивості 'info', яка не може бути змінена напряму, а лише змінюється за допомогю гетера
 */

// Створюємо ScienceBook, наслідуємо властивості і функції від об'єкта Book

// Додаємо властивість 'info' за допомогою Object.defineProperty
// Зробимо щоб 'info' не можно було видалити або змінити, перевіримо і спробуємо присвоїти ій будь яке значення (це потрібно робити ззовні defineProperty),
// Отримаємо помилку Cannot assign to read only property 'info' of object '#<Object>'

// Далі створюємо сетер який присвоє властивості info значення яке отримує при виклику, помилку більше не отримуємо але при спробі вивести значення info отримуємо undefined

// Створимо гетер який буде нам повертати рядок: Про книгу <title>: <info>
// тепер все виводить коректно

// Заповнюємо об'єкт
// | Властивість | Значення             |
// |-------------|----------------------|
// | title       | "Фізика 101"         |
// | author      | "Альберт Ейнштейн"   |
// | info        | написана в 1915 році |

console.log("Завдання: 4 ==============================");
function Book() {
  this.title = "Загальна Книга";
  this.author = "Анонім";
  this.pages = 0;
}
Book.prototype.read = function () {
  console.log(`Ви читаєте ${this.title} від ${this.author}`);
};
function ScienceBook() {
  Book.call(this);
  let info = "написана в 1915 році";
  Object.defineProperty(this, "info", {
    get: function () {
      return `Про книгу ${this.title}: ${info}`;
    },
    set: function (newInfo) {
      info = newInfo;
    },
    enumerable: false,
    configurable: false,
  });
  this.setInfo = function (newInfo) {
    info = newInfo;
  };
}
ScienceBook.prototype = Object.create(Book.prototype);
ScienceBook.prototype.constructor = ScienceBook;
const myScienceBook = new ScienceBook();
myScienceBook.setInfo("написана в 1920 році");
console.log("Властивість info:", myScienceBook.info);
console.log(
  "Налаштування властивості info:",
  Object.getOwnPropertyDescriptor(myScienceBook, "info")
);
// Виводимо в консоль властивість info

// Виводимо в консоль налаштування властивости info

// 5. Поліморфізм: створення нового об'єкта та перевизначення його методу
/*
 * Об'єкт: Textbook
 * Властивості та функції наслідуються від об'єкта ScienceBook
 * Метод read() перевизначено для демонстрації поліморфізму,
 * має виводити "Ви читаєте підручник "<title>" від <author>. <info>"
 */

//Створюємо Textbook та наслідуємо властивості з ScienceBook

// Перевизначаємо метод read(), відповідно з дописом вище

// Встановлюємо значення для Textbook
// | Властивість | Значення                   |
// |-------------|----------------------------|
// | title       | "Фізика у Вищій Школі"     |
// | author      | "Дж. Д. Джонс"             |

console.log("Завдання: 5 ==============================");
function Book() {
  this.title = "Загальна Книга";
  this.author = "Анонім";
  this.pages = 0;
}
Book.prototype.read = function () {
  console.log(`Ви читаєте ${this.title} від ${this.author}`);
};
function ScienceBook() {
  Book.call(this);
  let info = "написана в 1915 році";

  Object.defineProperty(this, "info", {
    get: function () {
      return `Про книгу ${this.title}: ${info}`;
    },
    enumerable: true,
    configurable: false,
  });

  this.setInfo = function (newInfo) {
    info = newInfo;
  };
}
ScienceBook.prototype = Object.create(Book.prototype);
ScienceBook.prototype.constructor = ScienceBook;
function Textbook() {
  ScienceBook.call(this);
  this.read = function () {
    console.log(
      `Ви читаєте підручник "${this.title}" від ${this.author}. ${this.info}`
    );
  };
}
Textbook.prototype = Object.create(ScienceBook.prototype);
Textbook.prototype.constructor = Textbook;
const myTextbook = new Textbook();
myTextbook.title = "Фізика у Вищій Школі";
myTextbook.author = "Дж. Д. Джонс";
myTextbook.read();
// Викликаємо функцію read об'єкту Textbook

// 6. Абстракція: створення об'єкта з загальними властивостями
/*
 * Об'єкт: Media
 * Властивості:
 * --------------
 * | Властивість | Значення           |
 * |-------------|--------------------|
 * | format      | "Загальний Формат" |
 * | length      | 0                  |
 *
 * Функції:
 * ---------------------------------------------------------------------------------------------------------------
 * | Функція | Опис                                                                                              |
 * |---------|---------------------------------------------------------------------------------------------------|
 * | play()  | Виводить повідомлення "Зараз відтворюється медіа у форматі <format> з тривалістю <length> секунд" |
 */

// Створюємо об'єкт Media

/*
 * Об'єкт: Song
 * Властивості та функції наслідуються від об'єкта Media
 * Додаткові властивості: artist, title
 */

// Створюємо об'єкт Song, наслідуємо властивості і функції від об'єкта Media

// Встановлюємо додаткові властивості
// | Властивість | Значення               |
// |-------------|------------------------|
// | artist      | "Загальний Виконавець" |
// | title       | "Загальна Пісня"       |

console.log("Завдання: 6 ==============================");
function Media() {
  this.format = "Загальний Формат";
  this.length = 0;
}
Media.prototype.play = function () {
  console.log(
    `Зараз відтворюється медіа у форматі ${this.format} з тривалістю ${this.length} секунд`
  );
};
function Song() {
  Media.call(this);
  this.artist = "Загальний Виконавець";
  this.title = "Загальна Пісня";
}
Song.prototype = Object.create(Media.prototype);
Song.prototype.constructor = Song;
const mySong = new Song();
mySong.artist = "Виконавець";
mySong.title = "Пісня";
mySong.play();
// Викликаємо функцію play об'єкту Song
