<template>
    <v-app id="inspire">
        <v-content>
            <router-view></router-view>
        </v-content>
        <!--BARRA DE NAVEGACION FOOTER
            <v-bottom-nav color="primary" :value="true" fixed dark>
            <v-btn :to="{path: '/map'}" dark>
                <span>{{ $t('menu.map') }}</span>
                <v-icon>map</v-icon>
            </v-btn>
            <v-btn :to="{path: '/map/add'}" dark>
                <span>{{ $t('menu.add') }}</span>
                <v-icon>add_circle</v-icon>
            </v-btn>
        </v-bottom-nav> -->
    </v-app>
</template>

<script>
    /*import moment from 'moment'*/

    export default {
        data: function () {
            return {
                title: 'MoovityMap'
            }
        },
        methods: {
            fixHeight: function () {
                let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                let wrapEl = document.getElementsByClassName('application--wrap')[0];
                wrapEl.setAttribute("style", "min-height:"+height+"px");
            }
        },
        created() {
           // this.processParams(this.$route);
        },
        mounted() {
            this.fixHeight();
            window.addEventListener('resize', this.fixHeight);
        }
    }
</script>

<style>
    html,body {
        height: 100%;
    }
    .v-item-group.v-bottom-nav--fixed {
        z-index: 11;
    }
</style>