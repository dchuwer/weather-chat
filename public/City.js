class City {

    constructor (city, temp_c, temp_f, weather, last_updated, icon) {
        this.city = city;
        this.temp_c = temp_c;
        this.temp_f = temp_f;
        this.id = this.getId();
        this.weather = weather;
        this.last_updated = last_updated;
        this.icon = icon;
        this.comment = [];

    }

    getId(){

        return Date.now();

    }



}

export { City };