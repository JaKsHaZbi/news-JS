import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import Data from '../interfaces/dataArticles';
import DataSources from '../interfaces/dataSources';

// move to utils
export const getElement = (target: EventTarget | null, errorMessage = "Error") => {
    if (target instanceof Element) {
        return target;
    }
    throw new Error(errorMessage);
}

// move to utils
export const getNotNil = <T>(target: T | null, errorMessage = "Error") => {
    if (!target) {
        throw new Error(errorMessage);
    }
    return target;
}

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        // better use utils like getElement / getNotNil
        const nodes = getNotNil(document.querySelectorAll('.sources'), "[App] start -> nodes is Nil");
        const burger = getNotNil(document.querySelector('.hamburger'), "[App] start -> burger is Nil");
        const menu = getNotNil(document.querySelector('.hamburger__list'), "[App] start -> menu is Nil");
    
        this.setBurger(burger, menu);

        nodes.forEach((element) => {
            element.addEventListener('click', (e) => {
                this.controller.getNews(e, (data?: Data) => this.view.drawNews(data!));
                window.scrollTo(0, 0);
                menu.classList.toggle('hide');
                burger.classList.toggle('rotate');
            });
        });
        this.controller.getSources((data?: DataSources) => {
            this.view.drawSources(data!);
        });
    }
    

    setBurger(burger: Element, menu: Element) {
        burger.addEventListener('click', () => {
            menu.classList.toggle('hide');
            burger.classList.toggle('rotate');
        });
    }
}

export default App;
