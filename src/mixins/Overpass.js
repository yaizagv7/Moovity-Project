import OverpassQuery from '../osm/OverpassQuery'

export default {
    data: function () {
        return {
            bounds: null
        }
    },
    methods: {
        boundsToGeojson: function () {
            if(!this.bounds) {
                return {};
            }
            let sw = this.bounds._southWest;
            let ne = this.bounds._northEast;
            return {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [[
                        [sw.lng, sw.lat], [ne.lng, sw.lat],
                        [ne.lng, ne.lat], [sw.lng, ne.lat]
                    ]]
                }
            };
        },
        bboxToString: function (bounds) {
            return bounds._southWest.lat + ',' + bounds._southWest.lng + ','
                + bounds._northEast.lat + ',' + bounds._northEast.lng;
        },
        bboxFromCenter: function (latlon) {
            let bounds = L.latLngBounds([
                [
                    latlon.lat - 0.05,
                    latlon.lng - 0.1
                ],
                [
                    latlon.lat + 0.05,
                    latlon.lng + 0.1
                ]
            ]);
            this.bounds = bounds;
            return this.bboxToString(bounds);
        },
        buildQuery: function (center, key, valor) {
            let bbox = this.bboxFromCenter(center);
            let query = new OverpassQuery();
            let tags = [
                {k: key, v: valor}
            ];
            return query.nodeByTags(tags, bbox).body;
        },
        buildQueryDouble: function (center, key, valor, key2, value2) {
            let bbox = this.bboxFromCenter(center);
            let query = new OverpassQuery();
            let tags = [
                {k: key, v: valor, k2: key2, v2: value2}
            ];
            return query.nodeByTagsDouble(tags, bbox).body;
        },
        fetchAmenity: function (center, callback, errorCallback, key, valor) {
            fetch(process.env.VUE_APP_OVERPASS_URL, {
                method: 'POST',
                body: this.buildQuery(center, key,valor)
            })
                .then(function (response) {
                    if(!response.ok) {
                        throw new Error(response.status);
                    }
                    return response.json();
                })
                .then(callback)
                .catch(errorCallback);
        },
        fetchAmenity2: function (center, callback, errorCallback, key, value, key2, value2) {
            fetch(process.env.VUE_APP_OVERPASS_URL, {
                method: 'POST',
                body: this.buildQueryDouble(center, key, value, key2, value2)
            })
                .then(function (response) {
                    if(!response.ok) {
                        throw new Error(response.status);
                    }
                    return response.json();
                })
                .then(callback)
                .catch(errorCallback);
        },
        fetchNode: function (params, callback) {
            let query = new OverpassQuery();
            if(params.type === 'way') {
                query.wayById(params.node);
            }
            else {
                query.nodeById(params.node);
            }
            fetch(process.env.VUE_APP_OVERPASS_URL, {
                method: 'POST',
                body: query.body
            })
                .then(function (response) {
                    if(!response.ok) {
                        throw new Error(response.status);
                    }
                    return response.json();
                })
                .then(callback);
        }
    }
}