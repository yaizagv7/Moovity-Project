export default class OsmParser {
    constructor(xmlDoc) {
        this.doc = xmlDoc;
    }
    supportedTags() {
        return [
            'name',
            'description',
            'shop:shoes',
            'shop:books',
            'shop:curtain',
            'shop:copyshop',
            'shop:florist',
            'shop:interior_decoration',
            'shop:laundry',
            'shop:bakery',
            'shop:shoe_repair',
            'shop:comics',
            'shop:convenience',
            'shop:computer',
            'shop:hairdresser',
            'shop:electronics',
            'shop:furniture',
        ];
    }
    get osm_type() {
        let nodeEl = this.doc.documentElement.firstElementChild;
        return nodeEl.tagName;
    }
    get version() {
        let nodeEl = this.doc.documentElement.firstElementChild;
        return nodeEl.getAttribute('version');
    }
    get refs() {
        let refs = [];
        this.doc.querySelectorAll('nd').forEach((nd) => refs.push(nd.getAttribute('ref')));
        return refs;
    }
    get tags() {
        let notSupportedTags = {};
        let supportedTags = this.supportedTags();
        this.doc.querySelectorAll('tag').forEach(function (tag) {
            let key = tag.getAttribute('k');
            if(key && !supportedTags.includes(key)) {
                notSupportedTags[key] = tag.getAttribute('v');
            }
        });
        return notSupportedTags;
    }
}
