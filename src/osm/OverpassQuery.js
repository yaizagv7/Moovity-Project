export default class OverpassQuery {
    constructor() {
        this.query = '';
    }
    nodeById(id) {
        this.query = '  node('+id+');\n';
        return this;
    }
    wayById(id) {
        this.query = '  way('+id+');\n';
        return this;
    }
    nodeByTags(tags, bbox) {
        // tags.forEach((tag) => this.query += '  node["'+tag.k+'"]('+bbox+');\n');
        // tags.forEach((tag) => this.query += '  way["'+tag.k+'"]('+bbox+');\n');
        tags.forEach((tag) => tag.v ? this.query += '  node["'+tag.k+'"="'+tag.v+'"]('+bbox+');\n' : this.query += '  node["'+tag.k+'"]('+bbox+');\n');
        tags.forEach((tag) => tag.v ? this.query += '  way["'+tag.k+'"="'+tag.v+'"]('+bbox+');\n' : this.query += '  way["'+tag.k+'"]('+bbox+');\n');
        return this;
    }
    nodeByTagsDouble(tags, bbox) {
        tags.forEach((tag) => this.query += '  node["'+tag.k+'"="'+tag.v+'"]["'+tag.k2+'"="'+tag.v2+'"]('+bbox+');\n');
        tags.forEach((tag) => this.query += '  way["'+tag.k+'"="'+tag.v+'"]["'+tag.k2+'"="'+tag.v2+'"]('+bbox+');\n');
        return this;
    }
    get qlString() {
        return '[out:json][timeout:25];\n' +
            '(\n' +
            this.query +
            ');\n' +
            'out center;';
    }
    get body() {
        return 'data='+this.qlString;
    }
}