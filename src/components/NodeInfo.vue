<template>
  <div class="node_info">
    <div class="icon_node" :class="type_node"></div>
    <span class="p_close" @click="closePopup">×</span>

    <table>
      <td class="title">{{ name_node }}</td>
      <td v-for="(item, key) in allTagsRender" class="node_info_tr" :key="key">
        <tr>
          <th v-if="key != 'Fumar' && key!='Silla de ruedas'">{{ key }}</th>
        </tr>
        <tr>
          <div
            v-if="item == 'Fuera'"
            v-html="icon_HTML_smoking" class="item"
          ></div>
          <div
            v-else-if="key == 'Silla de ruedas' && item == 'Si'"
            v-html="icon_HTML_wheelchair" class="item"
          ></div>
          <div
            v-else-if="key == 'Aire acondicionado' && item == 'Si'"
            v-html="icon_HTML_airconditioner" class="item"
          ></div>
          <div
            v-else-if="key == 'Terraza' && item == 'Si'"
            v-html="icon_HTML_terrace" class="item"
          ></div>
          <td v-else-if="key != 'Fumar' && key!='Silla de ruedas'" class="item">{{ item }}</td>
        </tr>
      </td>
    </table>
  </div>
</template>

<script>
export default {
  name: "node-info",
  props: ["labels", "selected"],
  data: function () {
    return {
      type_node: null,
      icon_HTML_smoking:
        "<img src='/../../img/no-smoking.svg' alt='no-smoking'>",
      icon_HTML_wheelchair:
        "<img src='/../../img/wheelchair.svg' alt='wheelchair'>",
      icon_HTML_airconditioner:
        "<img src='/../../img/air-conditioner.svg' alt='air-conditioner'>",
      icon_HTML_terrace: "<img src='/../../img/terrace.svg' alt='terrace'>",
      all_tags: null,
      all_tags_fixed: {},
      name_node: null,
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
    allTagsRender: function () {
      for (const key in this.all_tags) {
        console.log(key);
        /*console.log(`${prop} = ${this.all_tags[prop]}`);*/
        switch (key) {
          case "name":
            this.name_node = this.translateItem(this.all_tags[key]);
            break;
          case "amenity":
            this.all_tags_fixed["Tipo de establecimiento"] = this.translateItem(
              this.all_tags[key]
            );
            if (this.all_tags[key] == "fuel") {
              this.type_node = "icon_fuel2";
            }
            if (this.all_tags[key] == "restaurant") {
              this.type_node = "icon_restaurant2";
            }
            if (this.all_tags[key] == "bar") {
              this.type_node = "icon_bar2";
            }
            break;
          case "shop":
            this.all_tags_fixed["Tipo de establecimiento:"] =
              this.translateItem(this.all_tags[key]);
            if (this.all_tags[key] == "hairdresser") {
              this.type_node = "icon_hairdresser2";
            }
            break;
          case "brand":
            this.all_tags_fixed["Marca"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "opening_hours":
            this.all_tags_fixed["Horario"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "wheelchair":
            this.all_tags_fixed["Silla de ruedas"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "self_service":
            this.all_tags_fixed["Autoservicio"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "fuel:diesel":
            this.all_tags_fixed["Diesel"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "fuel:octane_95":
            this.all_tags_fixed["Gasolina 95"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "fuel:octane_98":
            this.all_tags_fixed["Gasolina 98"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "brand:website":
            this.all_tags_fixed["Sitio web"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "addr:housenumber":
            this.all_tags_fixed["nº"] = this.translateItem(this.all_tags[key]);
            break;
          case "addr:street":
            this.all_tags_fixed["Direccion"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "addr:postcode":
            this.all_tags_fixed["CP"] = this.translateItem(this.all_tags[key]);
            break;
          case "smoking":
            this.all_tags_fixed["Fumar"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "air_conditioning":
            this.all_tags_fixed["Aire acondicionado"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "indoor_seating":
            this.all_tags_fixed["Sillas dentro"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "outdoor_seating":
            this.all_tags_fixed["Terraza"] = this.translateItem(
              this.all_tags[key]
            );
            break;
        }
      }
      return this.all_tags_fixed;
    },
  },
  methods: {
    translateItem: function (item) {
      switch (item) {
        case "yes":
          item = "Si";
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
        case "restaurant":
          item = "Restaurante";
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
  display: flex;
  flex-direction: column;
}
.title {
  font-size: 20px;
  margin-bottom: 10px;
}
.icon_node {
  opacity: 0.07;
  width: 90%;
  position: absolute;
  top: 10px;
  bottom: 10px;
}
.item {
    display: inline;
}
tr{
    padding-bottom: 8px;
}
img {
  width: 40px;
  height: 40px;
}
.icon_fuel2 {
  background-image: url("data:image/svg+xml,%3Csvg width='80%' height='80%' viewBox='0 0 15 15' version='1.1' id='fuel' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13,6L13,6v5.5c0,0.2761-0.2239,0.5-0.5,0.5S12,11.7761,12,11.5v-2C12,8.6716,11.3284,8,10.5,8H9V2c0-0.5523-0.4477-1-1-1H2&%23xA;&%23x9;C1.4477,1,1,1.4477,1,2v11c0,0.5523,0.4477,1,1,1h6c0.5523,0,1-0.4477,1-1V9h1.5C10.7761,9,11,9.2239,11,9.5v2&%23xA;&%23x9;c0,0.8284,0.6716,1.5,1.5,1.5s1.5-0.6716,1.5-1.5V5c0-0.5523-0.4477-1-1-1l0,0V2.49C12.9946,2.2178,12.7723,1.9999,12.5,2&%23xA;&%23x9;c-0.2816,0.0047-0.5062,0.2367-0.5015,0.5184C11.9987,2.5289,11.9992,2.5395,12,2.55V5C12,5.5523,12.4477,6,13,6s1-0.4477,1-1&%23xA;&%23x9;s-0.4477-1-1-1 M8,6.5C8,6.7761,7.7761,7,7.5,7h-5C2.2239,7,2,6.7761,2,6.5v-3C2,3.2239,2.2239,3,2.5,3h5C7.7761,3,8,3.2239,8,3.5&%23xA;&%23x9;V6.5z'/%3E%3C/svg%3E");
}
.icon_hairdresser2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='80%' height='80%' viewBox='0 0 405.43 405.43' style='enable-background:new 0 0 405.43 405.43;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cg id='Layer_5_77_'%3E%3Cg%3E%3Cpath d='M268.515,260.015c-1.523-2.409-8.688-11.193-11.079-14.108c-3.781-4.608-8.095-4.108-11.485-0.034 c-8.271,9.936-19.832,23.728-26.46,31.623c-4.397,5.24-5.228,9.391-1.73,13.266c1.542,1.709,7.954,9.045,7.954,9.045 c-12.342,27.566-7.276,61.031,15.353,83.66c29.284,29.285,76.767,29.285,106.051,0s29.284-76.766,0-106.051 C325.854,256.154,295.029,250.409,268.515,260.015z M320.292,356.642c-13.552,13.551-35.521,13.551-49.068,0 c-13.551-13.55-13.551-35.519,0-49.066c13.549-13.55,35.519-13.55,49.068,0C333.841,321.123,333.841,343.092,320.292,356.642z' /%3E%3Cpath d='M151.469,208.117c8.522-11.597,22.224-29.08,29.38-38.96c3.598-4.966,3.931-8.799,0.021-14.211 C154.247,118.092,73.446,8.208,73.446,8.208C62.269-4.913,49.637-1.985,45.375,14.716L37.66,44.942 c-4.263,16.7,2.222,40.337,14.409,52.524c0,0,66.482,82.781,88.285,110.658C143.936,212.702,148.467,212.202,151.469,208.117z' /%3E%3Cpath d='M59.064,273.079c-29.285,29.285-29.285,76.766,0,106.051c29.285,29.285,76.766,29.285,106.051,0 c22.629-22.629,27.693-56.094,15.352-83.66l160.916-192.254c12.188-12.188,18.672-35.823,14.408-52.524l-7.716-30.226 c-4.263-16.701-16.896-19.629-28.069-6.508L142.45,249.074c-1.666,1.956-3.262,4.194-4.787,6.605 C111.148,246.075,80.323,251.821,59.064,273.079z M85.886,303.239c13.551-13.549,35.52-13.549,49.068,0 c13.551,13.551,13.551,35.52,0,49.066c-13.549,13.552-35.518,13.552-49.068,0C72.337,338.759,72.337,316.79,85.886,303.239z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");
}
.icon_bar2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' width='80%' height='80%' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 297 297' style='enable-background:new 0 0 297 297;' xml:space='preserve'%3E%3Cpath d='M265.49,72.014c2.836-2.897,3.658-7.213,2.086-10.95c-1.57-3.737-5.229-6.168-9.284-6.168h-48.877l37.7-37.7 c3.934-3.934,3.934-10.313,0-14.246c-3.935-3.933-10.311-3.933-14.245,0l-51.946,51.946H38.708c-4.055,0-7.714,2.431-9.284,6.168 c-1.572,3.737-0.75,8.053,2.086,10.95l106.918,109.232v95.609H93.605c-5.563,0-10.073,4.51-10.073,10.072S88.042,297,93.605,297 h109.791c5.563,0,10.073-4.51,10.073-10.072s-4.511-10.072-10.073-10.072h-44.823v-95.609L265.49,72.014z M198.516,111.638 L148.5,162.737l-50.016-51.099H198.516z M234.338,75.041l-16.104,16.451h-45.416l16.451-16.451H234.338z M160.779,75.041 l-16.452,16.451H78.766L62.662,75.041H160.779z'/%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A");
}
.icon_restaurant2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' width='80%' height='80%' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 232.207 232.207' style='enable-background:new 0 0 232.207 232.207;' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M218.016,115.773c0-19.599-5.567-37.921-15.194-53.476c0.524-0.709,1.035-1.437,1.532-2.186 c5.263-7.931,9.549-18.023,11.463-26.998c3.313-15.525-1.424-22.389-5.98-25.413c-6.344-4.209-15.91-3.194-26.942,2.862 c-7.154,3.928-13.896,9.408-18.925,15.262c-14.28-7.63-30.575-11.963-47.865-11.963c-15.483,0-30.168,3.477-43.323,9.681 L59.654,2.792c-1.771-2.8-5.474-3.633-8.278-1.863c-2.8,1.771-3.634,5.478-1.862,8.278l12.713,20.098 c-2.18,1.364-4.305,2.806-6.372,4.326L43.009,13.322c-1.771-2.8-5.475-3.634-8.278-1.863c-2.8,1.771-3.634,5.478-1.862,8.278 l13.679,21.625c-1.923,1.799-3.779,3.67-5.559,5.611L26.362,23.851c-1.771-2.8-5.475-3.633-8.278-1.863 c-2.8,1.771-3.634,5.478-1.862,8.278l16.796,26.552c-11.851,16.653-18.826,37.004-18.826,58.954 c0,34.058,16.797,64.265,42.538,82.78l-3.39,5.108c-4.434,6.681-2.605,15.723,4.076,20.157l8.992,5.968v0 c2.468,1.638,5.258,2.421,8.019,2.421c4.714,0,9.343-2.284,12.139-6.497l6.997-10.543c7.254,1.644,14.797,2.517,22.541,2.517 c8.165,0,16.105-0.971,23.719-2.793l6.667,10.54c2.765,4.37,7.488,6.764,12.313,6.764c2.656,0,5.344-0.726,7.751-2.248l9.119-5.77 c6.777-4.286,8.804-13.287,4.517-20.064l-3.896-6.158C201.573,179.392,218.016,149.469,218.016,115.773z M170.049,210.529 c0.75,1.185,0.396,2.758-0.789,3.508h-0.001l-9.119,5.77c-1.185,0.75-2.759,0.396-3.509-0.79L83.958,104.13 c-0.489-0.775-0.418-1.534-0.332-1.917c0.087-0.383,0.347-1.1,1.122-1.59l9.119-5.77c0.421-0.266,0.891-0.393,1.355-0.393 c0.844,0,1.67,0.418,2.153,1.182L170.049,210.529z M73.043,219.787L73.043,219.787l-8.991-5.967 c-1.169-0.775-1.488-2.356-0.714-3.524l37.671-56.764l9.299,14.701l-33.741,50.842C75.792,220.243,74.213,220.564,73.043,219.787z M53.09,51.704l10.715,16.938c-1.489,0.164-3.009,0.096-4.514-0.242c-3.569-0.804-6.612-2.949-8.568-6.041l-3.056-4.831 C49.388,55.509,51.198,53.565,53.09,51.704z M188.669,21.081c5.164-2.835,9.322-3.952,11.979-3.952c1.14,0,2.004,0.206,2.552,0.569 c1.585,1.052,2.473,5.452,0.881,12.91c-1.593,7.465-5.319,16.227-9.726,22.867c-7.294,10.989-18.992,16.599-25.545,12.249 c-3.85-2.554-4.465-7.659-4.489-10.474c-0.049-5.646,2.085-12.143,5.854-17.822C174.163,31.418,181.25,25.155,188.669,21.081z M151.738,105.806l-17.271,26.025l-9.299-14.701l13.341-20.103c0.776-1.168,2.357-1.488,3.525-0.712l8.991,5.967 C152.194,103.057,152.513,104.639,151.738,105.806z M157.237,35.837c-3.244,6.369-4.97,13.135-4.916,19.518 c0.056,6.413,1.97,12.073,5.374,16.27l-9.546,14.384c-6.623-4.012-15.316-2.126-19.638,4.384l-10.372,15.628l-10.623-16.793 c-4.178-6.603-12.827-8.678-19.537-4.812l-7.251-11.464c3.281-3.363,5.582-7.572,6.639-12.271 c1.507-6.696,0.316-13.579-3.354-19.379l-4.766-7.534c11.253-5.077,23.73-7.906,36.856-7.906 C130.917,25.861,144.904,29.464,157.237,35.837z M73.873,47.716c1.955,3.092,2.59,6.76,1.787,10.33 c-0.339,1.505-0.929,2.907-1.715,4.183L62.283,43.792c2.052-1.538,4.175-2.986,6.357-4.348L73.873,47.716z M40.581,68.775 c4.885,7.722,13.232,11.953,21.758,11.953c2.766,0,5.549-0.458,8.24-1.375l7.26,11.476c-3.011,2.081-5.111,5.157-5.919,8.749 c-0.853,3.79-0.179,7.685,1.898,10.967l20.164,31.876l-30.612,46.127c-22.511-16.357-37.177-42.884-37.177-72.776 c0-17.583,5.078-34,13.837-47.871L40.581,68.775z M117.337,179.344l15.652,24.744c-5.471,1.044-11.115,1.597-16.885,1.597 c-5.24,0-10.375-0.455-15.372-1.32L117.337,179.344z M141.495,142.942l20.242-30.501c4.32-6.511,2.679-15.254-3.59-19.799 l9.526-14.354c2.031,0.604,4.152,0.904,6.325,0.904c6.682,0,13.832-2.79,20.221-7.901c7.503,13.125,11.796,28.311,11.796,44.481 c0,29.435-14.218,55.612-36.147,72.024L141.495,142.942z'/%3E%3C/g%3E%3C/svg%3E%0A");
}
.icon_nosmoking {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512.011 512.011' style='enable-background:new 0 0 512.011 512.011;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cg%3E%3Cpath d='M490.672,213.341H341.339h-12.501L505.755,36.424c8.341-8.341,8.341-21.824,0-30.165c-8.341-8.341-21.824-8.341-30.165,0 L268.507,213.341H21.339c-11.776,0-21.333,9.557-21.333,21.333v85.333c0,11.776,9.557,21.333,21.333,21.333h119.168 L6.256,475.592c-8.341,8.341-8.341,21.824,0,30.165c4.16,4.16,9.621,6.251,15.083,6.251c5.461,0,10.923-2.091,15.083-6.251 l164.416-164.416h140.501h149.333c11.776,0,21.333-9.557,21.333-21.333v-85.333C512.005,222.899,502.448,213.341,490.672,213.341 z'/%3E%3Cpath d='M42.672,192.008c11.776,0,21.333-9.557,21.333-21.333c0-8.107,2.709-11.392,3.051-11.691h36.565 c21.845,0,39.616-17.771,39.616-39.616c0-2.901-0.299-5.76-0.896-8.533c11.691-9.515,19.179-24,19.179-40.213 c0-20.608-12.181-39.232-31.04-47.488c-10.795-4.757-23.381,0.192-28.096,10.987c-4.736,10.795,0.192,23.381,10.987,28.096 c3.328,1.451,5.483,4.757,5.483,8.405c0,5.035-4.075,9.131-9.088,9.131c-10.389,0-19.264,7.467-21.035,17.707 c-1.216,7.083,1.216,14.08,6.101,18.859H67.056c-26.069,0-45.717,23.36-45.717,54.357 C21.339,182.451,30.896,192.008,42.672,192.008z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");
}
.icon_wheelchair {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 488.7 488.7' style='enable-background:new 0 0 488.7 488.7;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M419.633,379.2c-6.2-9.4-18.7-11.5-28.1-5.2l-5.2,3.1l-54.2-94.8c-4.2-6.2-10.4-10.4-17.7-10.4h-57.3v-43.7h37.5 c11.5,0,20.8-9.4,20.8-20.8c0-11.5-9.4-20.8-20.8-20.8h-37.5v-26c0-11.5-9.4-20.8-20.8-20.8c-11.3,0-20.6,9.2-20.8,20.4 c-83.8,7.4-150,78.2-150,163.9c0,90.6,74,164.6,164.6,164.6c54.7,0,104.4-26.6,134.9-68.9c11.5,10.5,21.3,5.4,24.4,3.3l25-15.6 C423.733,401.1,425.833,388.6,419.633,379.2z M230.033,449c-68.7,0-123.9-55.2-123.9-123.9c0-63.8,47.6-115.9,109.4-123.1v89.8 c0,11.5,9.4,20.8,20.8,20.8h65.6l39.1,68C319.733,422,277.233,449,230.033,449z'/%3E%3Cpath d='M235.233,118.8c33.3,0,59.4-27.1,59.4-59.4s-26-59.4-59.4-59.4c-32.3,0-59.4,27.1-59.4,59.4 C175.933,91.7,201.933,118.8,235.233,118.8z M235.233,39.6c10.4,0,19.8,8.3,18.7,18.7c0,10.4-8.3,18.7-18.7,18.7 s-18.7-8.3-18.7-18.7C216.533,48,224.833,39.6,235.233,39.6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
}
</style>