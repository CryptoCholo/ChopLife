const menuIndex = require('./utils');


class Menu {
    constructor() {
        this.menuOptions = ["For Grilled options reply 10","For Pepper Soup options reply 20","For Side options reply 30","For Beverages options reply 40"];
        this.grilledOptions = ["Reply 12 for Barbecued Catfish  -  $50","Reply 14 for Barbecued Croacker  -  $50","Reply 16 for Grilled Chicken Wings  -  $65"];
        this.peppersoupOptions = ["Reply 22 for Catfish Peppersoup   -  $40","Reply 24 for Chicken Peppersoup   -  $45","Reply 26  for Goatmeat Peppersoup -  $55"];
        this.sideOptions = ["Reply 32 for Fried Yam -  $20"," Reply 34 for Fried Potatoes  -  $20"," Reply 36 for Fried Plantain  -  $25"];
        this.beverageOptions = ["Reply 42  for Beer(Heineken) -  $30","Reply 44 for  Palmwine(1 Litre)  -  $40","Reply 46 for Soft Drinks (Chi Exotic)  -  $20"];
        this.index = menuIndex;
    }

    
    getMenu() {
        return this.menuOptions;
    }
    getGrilledMenu() {
        return this.grilledOptions;
    }
    getSoupMenu() {
        return this.peppersoupOptions;
    }
    getSideMenu() {
        return this.sideOptions;
    }
    getBeverageMenu() {
        return this.beverageOptions;
    }
}

module.exports = Menu;