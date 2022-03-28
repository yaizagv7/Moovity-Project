export default class Filter {
    constructor() {
        let stored = localStorage.getItem('filter');
        if(stored) {
            Object.assign(this, JSON.parse(stored));
        }
        else {
            this.assignFilters();
        }
    }
    assignFilters() {
        this.hairdresser = false;
        this.fuel = false;
        this.bar = false;
    }
    invert(key) {
        //MODO INTERRUPTOR
        this[key] = !this[key];
        if(this[key] && key === 'shop') {
            this.assignFilters();
        }
        localStorage.setItem('filter', JSON.stringify(this));
    }
    enabled() {
        for (let key in this) {
            if(this.hasOwnProperty(key) && this[key]) {
                return true;
            }
        }
        return false;
    }
    fit(geoJsonProps) {
        let filter = this;       
        let geo_amenity = geoJsonProps.amenity;
        let geo_shop = geoJsonProps.shop;
        console.log("fit geojson");
        console.log(geoJsonProps);
        // console.log("asign shops");
        // console.log(this.assignShops);
        console.log("this");
        console.log(filter);
        //console.log(typeof(filter));
        for (let key in filter) {
            //console.log(key);
            //console.log(valueOf(key));
            if(!filter.hasOwnProperty(key) || !this[key]) {
                //console.log("no tiene la propiedad:"+ key);
                continue;
            }
            if(filter.hasOwnProperty(key) && tipodetienda === key) {
                //console.log(geoJsonProps.shop + "="+ key);
                return true;
            }
        }
        return false;
    
    }
}
