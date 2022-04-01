<template>
  <div>
    <transition name="translate">
    <div class="map_filters" v-if="sideBar">
      <div class="brand">Moovity Map</div>
      <div class="menu-list">
        <ul>
          <li
            v-for="item in menu"
            :key="item.name"
            @click="item.isOpen = !item.isOpen"
          >
            <div class="menu1" :class="item.icon">{{ item.name }}</div>
            <ul v-if="item.isOpen" class="menu2">
              <li v-for="children in item.children" :key="children.name">
                <div
                  @click.stop.prevent="$emit('launch-query', children.tags)"
                  :class="['map_filter', children.icon]"
                >
                  {{ children.name.toUpperCase() }}
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    </transition>
    <button v-if="sideBar" @click="openCloseSideBar">&laquo; &raquo;</button>
    <button v-else class="toOpen"  @click="openCloseSideBar">&laquo; &raquo;</button>
  </div>
</template>

<script>
import menu_data from "../menu-data.json";

const menu = menu_data.tojoson();

export default {
  name: "nodes-filter",
  props: ["filter"],
  data: function () {
    return {
      menu: menu_data,
      sideBar: true,
      button: true
    };
  },
  methods: {
    toggleChildren(item) {
      item.isOpen = !item.isOpen;
    },
    openCloseSideBar: function () {
      this.sideBar = !this.sideBar;
      if (!this.sideBar) {
      }
    },
  },
};
</script>

<style>
.translate-enter-active, .translate-leave-active {
  transition: right -300px;
  transition-duration: 2s;}
.translate-enter, .translate-leave-to {
    transform: translateX(-300px);
}
button {
    background-color: #79adf1 !important;
  position: absolute;
  border: none;
  height: 40px;
  width: 40px;
  border-radius: 50% !important;
  box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.3);
  left: 270px;
  top: 15px;
  cursor: pointer;
  transition: left 2s;
}
.toOpen{
    left: 30px;
}
.map_filters .brand {
  /*background-color: #9be3ff;*/
  line-height: 70px;
  display: block;
  text-align: center;
  font-size: 24px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  text-shadow: black 0.1em 0.1em 0.2em;
  color: white;
  background: linear-gradient(to bottom, #4698f7 75%, rgb(250, 250, 250) 100%);
}

.map_filters {
  background-color: rgb(250, 250, 250);
  overflow: auto;
  font-family: verdana;
  font-size: 14px;
  font-weight: bolder;
  position: fixed;
  top: 5px;
  margin-left: 5px;
  width: 280px;
  height: 98%;
  border-radius: 10px;
  box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.3);
}
@media screen and (max-width: 500px) {
  .map_filters {
    width: 240px;
  }
  button {
    left: 230px;
  }
  .map_filter {
    font-size: 11px !important;
    justify-content: flex-start !important;
  }
}

@media screen and (min-width: 700px) {
  .map_filter:hover {
    background-color: rgb(233, 233, 233);
    box-shadow: 0px 1px 4px 1px rgb(0, 0, 0);
    font-weight: bold;
  }
}
.filter_active:before {
  width: 15px;
  height: 15px;
  border-radius: 25px;
  content: "";
  display: block;
  background: #3a4286 !important;
  position: absolute;
  top: 10px;
  left: 5px;
  /*box-shadow: #d5afff 0 -4px 0 0 inset;*/
}

li {
  list-style: none;
}
.menu1 {
  margin-top: 10px;
  padding-top: 5px;
  background-position: left 0px;
  height: 35px;
  cursor: pointer;
}
ul .menu2 {
  padding-left: 0px;
}

.map_filter {
  background-color: rgb(197, 202, 204);
  margin: 2px;
  padding: 5px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: 95% 50%;
  padding-top: 22px;
  padding-bottom: 10px;
  position: relative;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-content: center;
  line-height: 1em;
  overflow-wrap: break-word;
  width: 95%;
  font-size: 12px;
}
/*menu 1*/
.icon_shop:before,
.icon_shops {
  background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Ccircle style='fill:%234AB8A1;' cx='256' cy='256' r='256'/%3E%3Cpath style='fill:%23B3B3B3;' d='M96,432v-20c0-4.4,3.6-8,8-8h300c4.4,0,8,3.6,8,8v20H96z'/%3E%3Crect x='112' y='164' style='fill:%23E6E6E6;' /%3E%3Cpath style='fill:%23CCCCCC;' d='M400,164H112v59.684c4.712,2.728,10.164,4.316,16,4.316c17.672,0,32-14.328,32-32 c0,17.672,14.328,32,32,32s32-14.328,32-32c0,17.672,14.328,32,32,32s32-14.328,32-32c0,17.672,14.328,32,32,32s32-14.328,32-32 c0,17.672,14.328,32,32,32c5.836,0,11.288-1.588,16-4.316V164z'/%3E%3Cg%3E%3Cpath style='fill:%23CC584C;' d='M224,88v100c0,17.672,14.328,32,32,32s32-14.328,32-32V88H224z'/%3E%3Cpath style='fill:%23CC584C;' d='M352,88v100c0,17.672,14.328,32,32,32s32-14.328,32-32L400,88H352z'/%3E%3Cpath style='fill:%23CC584C;' d='M112,88L96,188c0,17.672,14.328,32,32,32s32-14.328,32-32V88H112z'/%3E%3C/g%3E%3Cpath style='fill:%23BF5347;' d='M96,188c0,17.672,14.328,32,32,32s32-14.328,32-32H96z'/%3E%3Cpath style='fill:%23F5F5F5;' d='M160,88v100c0,17.672,14.328,32,32,32s32-14.328,32-32V88H160z'/%3E%3Cpath style='fill:%23E6E6E6;' d='M160,188c0,17.672,14.328,32,32,32s32-14.328,32-32H160z'/%3E%3Cg%3E%3Cpath style='fill:%23BF5347;' d='M224,188c0,17.672,14.328,32,32,32s32-14.328,32-32H224z'/%3E%3Cpath style='fill:%23BF5347;' d='M352,188c0,17.672,14.328,32,32,32s32-14.328,32-32H352z'/%3E%3C/g%3E%3Cpath style='fill:%23F5F5F5;' d='M288,88v100c0,17.672,14.328,32,32,32s32-14.328,32-32V88H288z'/%3E%3Cpath style='fill:%23E6E6E6;' d='M288,188c0,17.672,14.328,32,32,32s32-14.328,32-32H288z'/%3E%3Crect x='96' y='184' style='opacity:0.4;fill:%23F5F5F5;enable-background:new ;' width='320' height='4'/%3E%3Crect x='128' y='244' style='fill:%23999999;' width='256' height='136'/%3E%3Crect x='136' y='252' style='fill:%23C2E2F2;' width='240' height='120'/%3E%3Cpath style='opacity:0.3;fill:%23F5F5F5;enable-background:new ;' d='M149.172,294.828c-1.564-1.564-1.564-4.092,0-5.656l24-24 c1.564-1.564,4.092-1.564,5.656,0s1.564,4.092,0,5.656l-24,24c-0.78,0.78-1.804,1.172-2.828,1.172S149.952,295.608,149.172,294.828z M202.828,265.172c-1.564-1.564-4.092-1.564-5.656,0l-48,48c-1.564,1.564-1.564,4.092,0,5.656c0.78,0.78,1.804,1.172,2.828,1.172 s2.048-0.392,2.828-1.172l48-48C204.392,269.264,204.392,266.736,202.828,265.172z'/%3E%3Cg%3E%3Crect x='112' y='400' style='fill:%23CCCCCC;' width='288' height='4'/%3E%3Crect x='132' y='404' style='fill:%23CCCCCC;' width='4' height='28'/%3E%3Crect x='180' y='404' style='fill:%23CCCCCC;' width='4' height='28'/%3E%3Crect x='228' y='404' style='fill:%23CCCCCC;' width='4' height='28'/%3E%3Crect x='276' y='404' style='fill:%23CCCCCC;' width='4' height='28'/%3E%3Crect x='324' y='404' style='fill:%23CCCCCC;' width='4' height='28'/%3E%3Crect x='372' y='404' style='fill:%23CCCCCC;' width='4' height='28'/%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A");
}
.icon_rest:before,
.icon_rest {
  background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Ccircle style='fill:%23273B7A;' cx='256' cy='256' r='256'/%3E%3Cpath style='fill:%23121149;' d='M257.636,511.979C398.265,511.097,512,396.838,512,256c0-2.481-0.045-4.949-0.114-7.413 L409.353,146.054c-1.395,0-6.78,51.369-10.985,93.729l-49.433-49.433c0-1.92-49.609,92.089-70.696,132.136L175.094,219.339 l7.044-7.044l-11.885-11.885l11.419-11.419l-40.474-40.472l-4.274,18.563l-18.563-18.563l-4.674,17.386L96.301,148.52l-8.911,48.15 l4.355,4.355l-0.274,6.242l23.559,22.399l-1.422,138.285L257.636,511.979z'/%3E%3Cpath style='fill:%23FFFFFF;' d='M426.667,186.675c0-17.111-12.062-44.453-26.941-44.453c-14.879,0-26.941,27.343-26.941,44.453 c0,14.808,9.04,27.172,21.116,30.236v72.156h11.65V216.91C417.626,213.847,426.667,201.485,426.667,186.675z'/%3E%3Cpath style='fill:%23FF7F4F;' d='M389.435,265.059h20.578v92.603c0,5.682-4.606,10.288-10.29,10.288l0,0 c-5.682,0-10.29-4.606-10.29-10.288v-92.603H389.435z'/%3E%3Cpath style='fill:%23FFFFFF;' d='M136.056,145.43c-3.217,0-5.825,2.608-5.825,5.825v41.479c0,4.863-4.058,8.819-9.045,8.819h-1.753 V151.88c0-3.217-2.608-5.825-5.825-5.825s-5.825,2.608-5.825,5.825v49.673h-1.753c-4.987,0-9.045-3.956-9.045-8.819v-41.477 c0-3.217-2.608-5.825-5.825-5.825c-3.217,0-5.825,2.608-5.825,5.825v41.479c0,11.286,9.283,20.47,20.695,20.47h1.753v75.864 c0,3.217,2.608,5.825,5.825,5.825c3.217,0,5.825-2.608,5.825-5.825v-75.864h1.753c11.412,0,20.695-9.183,20.695-20.47v-41.479 C141.881,148.039,139.273,145.43,136.056,145.43z'/%3E%3Cpath style='fill:%23FF7F4F;' d='M103.319,265.059h20.578v92.603c0,5.682-4.606,10.288-10.29,10.288l0,0 c-5.682,0-10.288-4.606-10.288-10.288C103.319,357.662,103.319,265.059,103.319,265.059z'/%3E%3Ccircle style='fill:%23FEE187;' cx='256' cy='256' r='113.778'/%3E%3Cpath style='fill:%23FFC61B;' d='M369.778,256c0-62.838-50.94-113.778-113.778-113.778v227.556 C318.838,369.778,369.778,318.838,369.778,256z'/%3E%3Ccircle style='fill:%23FFEDB5;' cx='256' cy='256' r='85.333'/%3E%3Cpath style='fill:%23FEE187;' d='M341.333,256c0-47.128-38.205-85.333-85.333-85.333v170.667 C303.128,341.333,341.333,303.128,341.333,256z'/%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E ");
}
/*menu2*/
.icon_hairdresser:after,
.icon_hairdresser {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='25px' height='25px' viewBox='0 0 405.43 405.43' style='enable-background:new 0 0 405.43 405.43;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cg id='Layer_5_77_'%3E%3Cg%3E%3Cpath d='M268.515,260.015c-1.523-2.409-8.688-11.193-11.079-14.108c-3.781-4.608-8.095-4.108-11.485-0.034 c-8.271,9.936-19.832,23.728-26.46,31.623c-4.397,5.24-5.228,9.391-1.73,13.266c1.542,1.709,7.954,9.045,7.954,9.045 c-12.342,27.566-7.276,61.031,15.353,83.66c29.284,29.285,76.767,29.285,106.051,0s29.284-76.766,0-106.051 C325.854,256.154,295.029,250.409,268.515,260.015z M320.292,356.642c-13.552,13.551-35.521,13.551-49.068,0 c-13.551-13.55-13.551-35.519,0-49.066c13.549-13.55,35.519-13.55,49.068,0C333.841,321.123,333.841,343.092,320.292,356.642z' /%3E%3Cpath d='M151.469,208.117c8.522-11.597,22.224-29.08,29.38-38.96c3.598-4.966,3.931-8.799,0.021-14.211 C154.247,118.092,73.446,8.208,73.446,8.208C62.269-4.913,49.637-1.985,45.375,14.716L37.66,44.942 c-4.263,16.7,2.222,40.337,14.409,52.524c0,0,66.482,82.781,88.285,110.658C143.936,212.702,148.467,212.202,151.469,208.117z' /%3E%3Cpath d='M59.064,273.079c-29.285,29.285-29.285,76.766,0,106.051c29.285,29.285,76.766,29.285,106.051,0 c22.629-22.629,27.693-56.094,15.352-83.66l160.916-192.254c12.188-12.188,18.672-35.823,14.408-52.524l-7.716-30.226 c-4.263-16.701-16.896-19.629-28.069-6.508L142.45,249.074c-1.666,1.956-3.262,4.194-4.787,6.605 C111.148,246.075,80.323,251.821,59.064,273.079z M85.886,303.239c13.551-13.549,35.52-13.549,49.068,0 c13.551,13.551,13.551,35.52,0,49.066c-13.549,13.552-35.518,13.552-49.068,0C72.337,338.759,72.337,316.79,85.886,303.239z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");
}
.icon_fuel:after,
.icon_fuel {
  background-image: url("data:image/svg+xml,%3Csvg width='25px' height='25px' viewBox='0 0 15 15' version='1.1' id='fuel' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13,6L13,6v5.5c0,0.2761-0.2239,0.5-0.5,0.5S12,11.7761,12,11.5v-2C12,8.6716,11.3284,8,10.5,8H9V2c0-0.5523-0.4477-1-1-1H2&%23xA;&%23x9;C1.4477,1,1,1.4477,1,2v11c0,0.5523,0.4477,1,1,1h6c0.5523,0,1-0.4477,1-1V9h1.5C10.7761,9,11,9.2239,11,9.5v2&%23xA;&%23x9;c0,0.8284,0.6716,1.5,1.5,1.5s1.5-0.6716,1.5-1.5V5c0-0.5523-0.4477-1-1-1l0,0V2.49C12.9946,2.2178,12.7723,1.9999,12.5,2&%23xA;&%23x9;c-0.2816,0.0047-0.5062,0.2367-0.5015,0.5184C11.9987,2.5289,11.9992,2.5395,12,2.55V5C12,5.5523,12.4477,6,13,6s1-0.4477,1-1&%23xA;&%23x9;s-0.4477-1-1-1 M8,6.5C8,6.7761,7.7761,7,7.5,7h-5C2.2239,7,2,6.7761,2,6.5v-3C2,3.2239,2.2239,3,2.5,3h5C7.7761,3,8,3.2239,8,3.5&%23xA;&%23x9;V6.5z'/%3E%3C/svg%3E");
}
.icon_bar:after,
.icon_bar {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' width='25px' height='25px' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 297 297' style='enable-background:new 0 0 297 297;' xml:space='preserve'%3E%3Cpath d='M265.49,72.014c2.836-2.897,3.658-7.213,2.086-10.95c-1.57-3.737-5.229-6.168-9.284-6.168h-48.877l37.7-37.7 c3.934-3.934,3.934-10.313,0-14.246c-3.935-3.933-10.311-3.933-14.245,0l-51.946,51.946H38.708c-4.055,0-7.714,2.431-9.284,6.168 c-1.572,3.737-0.75,8.053,2.086,10.95l106.918,109.232v95.609H93.605c-5.563,0-10.073,4.51-10.073,10.072S88.042,297,93.605,297 h109.791c5.563,0,10.073-4.51,10.073-10.072s-4.511-10.072-10.073-10.072h-44.823v-95.609L265.49,72.014z M198.516,111.638 L148.5,162.737l-50.016-51.099H198.516z M234.338,75.041l-16.104,16.451h-45.416l16.451-16.451H234.338z M160.779,75.041 l-16.452,16.451H78.766L62.662,75.041H160.779z'/%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A");
}
.icon_chinese:after,
.icon_chinese {
  background-image: url("data:image/svg+xml,%3Csvg width='25' height='25' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M304.65,185.67l-27.396-34.778l91.541-116.204l-26.23-20.663L256,123.912L169.436,14.025l-26.23,20.663l91.541,116.204 l-27.396,34.778H0l0.075,21.613c1.161,51.209,17.325,100.169,46.938,141.945c22.711,32.037,51.985,58.071,85.877,76.636H379.11 c33.892-18.564,63.166-44.599,85.877-76.636c29.614-41.776,45.778-90.736,46.938-141.945L512,185.67H304.65z M249.857,185.67 l6.143-7.797l6.142,7.797H249.857z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Crect x='156.316' y='459.261' width='199.357' height='38.714'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");
}
.icon_regional:after,
.icon_regional {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' width='29' height='29' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M347.961,341.208c-3.34-3.355-4.256-8.44-2.278-12.656c5.385-11.481,8.115-23.698,8.115-36.311 c0-44.644-34.821-81.848-80.539-89.448V80.539h11.506V0h-57.528v80.539h11.506v122.255c-45.719,7.602-80.539,44.804-80.539,89.448 c0,12.611,2.73,24.829,8.115,36.311c1.977,4.214,1.061,9.3-2.278,12.655c-18.603,18.685-28.848,42.565-28.848,67.241 C135.191,465.547,189.386,512,256,512s120.809-46.453,120.809-103.551C376.809,383.773,366.564,359.893,347.961,341.208z M256,270.382c12.709,0,23.011,10.302,23.011,23.011S268.709,316.404,256,316.404s-23.011-10.302-23.011-23.011 S243.291,270.382,256,270.382z M290.517,419.955h-69.034v-34.517h69.034V419.955z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
}
</style>
