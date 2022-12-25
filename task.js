//Массив элементов Card:
const cardList = Array.from(document.querySelectorAll('.card'));

class Card {
    constructor(card) {
        //Массив элементов rotator__case для каждого элемента card:
        this.rotatorLists = Array.from(card.children[0].children[0].children);
        this.elemCount = this.rotatorLists.length;
        this.activeElemCard = 0;
        this.dataSpeed = 1000;
        this.actElemCheck();
        let _this = this;
        this.timer = setInterval(function() {_this.changeElem()}, _this.dataSpeed);
    }

    //Проверка отображения rotator__case элементов карты
    actElemCheck() {
        let actElemCheck = true; //Для проверки на отображение сразу нескольких элементов
        for (let iElemCard = 0; iElemCard < this.rotatorLists.length; iElemCard++) {
            //Вычисление активных элементов в каждом элементе card:
            if (this.rotatorLists[iElemCard].className == "rotator__case rotator__case_active") {
                if (actElemCheck) {
                    actElemCheck = false;
                    this.activeElemCard = iElemCard;
                } else {this.rotatorLists[iElemCard].className = "rotator__case"}
            }
            //Если включённых элементов не найдено, то включаем элемент 0:
            if (actElemCheck) {
                this.rotatorLists[0].className = "rotator__case rotator__case_active";
            }
        }

        this.rotatorLists.at(this.activeElemCard).style.color = this.rotatorLists.at(this.activeElemCard).getAttribute("data-color");
        this.dataSpeed = this.rotatorLists.at(this.activeElemCard).getAttribute("data-speed");
    }

    //Функция переключения элемента rotator__case
    changeElem() {
        this.rotatorLists.at(this.activeElemCard).className = "rotator__case";//Отключаем текущий активный элемент
        this.activeElemCard = (this.activeElemCard + 1) % this.elemCount;
        this.rotatorLists.at(this.activeElemCard).className = "rotator__case rotator__case_active";//Включаем новый элемент
        this.rotatorLists.at(this.activeElemCard).style.color = this.rotatorLists.at(this.activeElemCard).getAttribute("data-color");
        this.dataSpeed = this.rotatorLists.at(this.activeElemCard).getAttribute("data-speed");
        this.runTimer();
    }

    //Таймер:
    runTimer() {
        clearTimeout(this.timer);
        let _this = this;
        this.timer = setInterval(function() {_this.changeElem()}, _this.dataSpeed);
    }
}

let cardClassLists = []; //Массив экземпляров класса Card

//Перебор элементов Card и заполнение массивов:
for (let iCardList = 0; iCardList < cardList.length; iCardList++) {
    cardClassLists.push(new Card(cardList[iCardList]));
}