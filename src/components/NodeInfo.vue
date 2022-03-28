<template>
  <div class="node_info">
    <span class="p_close" @click="closePopup">×</span>

    <table>
      <tr v-for="(item, key) in all_tags" class="node_info_tr" :key="key">
        <td>{{ translateKey(key) }}</td>
        <th>{{ translateItem(item) }}</th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "node-info",
  props: ["labels", "selected"],
  data: function () {
    return {
      validKey: null,
      all_tags: null,
      node_type: null,
      node_id: null,
      amenity: null,
      centre: null,
      name: null,
      info: false,
    };
  },
  computed: {
    osmLink: function () {
      return "https://openstreetmap.org/" + this.node_type + "/" + this.node_id;
    },
    josmLink: function () {
      return (
        "http://127.0.0.1:8111/load_object?objects=" +
        this.node_type.substring(0, 1) +
        this.node_id
      );
    },
  },
  methods: {
    translateKey: function (key) {
      switch (key) {
        case "amenity":
          key = "Tipo de establecimiento";
          return key;
        case "brand":
          key = "Marca";
          return key;
        case "opening_hours":
          key = "Horario:";
          return key;
        case "wheelchair":
          key = "Acceso silla de ruedas";
          return key;
        case "self_service":
          key = "Autoservicio";
          return key;
        case "fuel:diesel":
          key = "Diesel";
          return key;
        case "fuel:octane_95":
          key = "Gasolina 95";
          return key;
        case "fuel:octane_98":
          key = "Gasolina 98";
          return key;
        case "brand:website":
          key = "Sitio web";
          return key;
        case "addr:housenumber":
          key = " ";
          return key;
        case "addr:street":
          key = "Direccion";
          return key;
        case "addr:postcode":
          key = "C.P";
          return key;
        /*Shops:*/
        case "shop":
          key = "Tipo de establecimiento:";
          return key;
        case "name":
          key = "Nombre";
          return key;
        case "smoking":
          key = "Fumar";
          return key;
        case "air_conditioning":
          key = "Aire acondicionado";
          return key;
        case "indoor_seating":
          key = "Sillas dentro";
          return key;
        case "outdoor_seating":
          key = "Terraza";
          return key;
        default:
          return key;
      }
    },
    translateItem: function (item) {
      switch (item) {
        case "yes":
          item = "Sí";
          return item;
        case "fuel":
          item = "Gasolinera";
          return item;
        case "hairdresser":
          item = "Peluquería";
          return item;
                  case "outside":
          item = "Fuera";
          return item;
                            case "limited":
          item = "Limitado";
          return item;
        default:
          return item;
      }
    },
    closePopup: function () {
      this.$emit("close-info");
    },
  },
  created() {
    if (this.selected) {
      let geoJsonProps = this.selected.props;
      this.all_tags = Object.assign({}, geoJsonProps);
      delete this.all_tags.id;
      this.node_type = this.selected.node_type;
      this.node_id = this.selected.node_id;
      this.name = geoJsonProps.name;
    }
  },
};
</script>

<style>
.node_info_tr:hover {
  background: #f6f6f6;
}
.node_info {
  max-height: 95vh;
  overflow: auto;
  background: rgb(241, 250, 255);
  box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  padding: 20px;
  position: absolute;
  top: 10px;
  left: 10px;
  padding-top: 40px;
  z-index: 1;
  max-width: 300px;
}

td {
  padding-right: 10px;
}

.icon_fuel {
  background-image: url("data:image/svg+xml,%3Csvg width='25px' height='25px' viewBox='0 0 15 15' version='1.1' id='fuel' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13,6L13,6v5.5c0,0.2761-0.2239,0.5-0.5,0.5S12,11.7761,12,11.5v-2C12,8.6716,11.3284,8,10.5,8H9V2c0-0.5523-0.4477-1-1-1H2&%23xA;&%23x9;C1.4477,1,1,1.4477,1,2v11c0,0.5523,0.4477,1,1,1h6c0.5523,0,1-0.4477,1-1V9h1.5C10.7761,9,11,9.2239,11,9.5v2&%23xA;&%23x9;c0,0.8284,0.6716,1.5,1.5,1.5s1.5-0.6716,1.5-1.5V5c0-0.5523-0.4477-1-1-1l0,0V2.49C12.9946,2.2178,12.7723,1.9999,12.5,2&%23xA;&%23x9;c-0.2816,0.0047-0.5062,0.2367-0.5015,0.5184C11.9987,2.5289,11.9992,2.5395,12,2.55V5C12,5.5523,12.4477,6,13,6s1-0.4477,1-1&%23xA;&%23x9;s-0.4477-1-1-1 M8,6.5C8,6.7761,7.7761,7,7.5,7h-5C2.2239,7,2,6.7761,2,6.5v-3C2,3.2239,2.2239,3,2.5,3h5C7.7761,3,8,3.2239,8,3.5&%23xA;&%23x9;V6.5z'/%3E%3C/svg%3E");
}
</style>