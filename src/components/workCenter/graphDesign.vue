<template>
    <div class="graphDesign">
        <div class="gridLayoutContainer">
            <grid-layout ref="gridLayout" :prevent-collision="false" :layout.sync="layout" :col-num="12" :row-height="60" :is-resizable="false" >
                <grid-item v-for="itemGrid in backLayout" :x="itemGrid.x" :y="itemGrid.y" :w="itemGrid.w" :h="itemGrid.h" :i="itemGrid.i"
                    :key="itemGrid.i" class="itemGrid">
                </grid-item>


                <grid-item :class="currentGridItem == item.id ? 'activeGideItem' : ''" v-for="item in layout" :x="item.x"
                    :y="item.y" :min-w="item.minW" :min-h="item.minH" :max-w="item.maxW" :max-h="item.maxH" :w="item.w"
                    :h="item.h" :i="item.id" :key="item.id" responsive="true" :is-draggable="false" >
                    <div class="gridItemBox" @click="getGideItem(item)">
                        <div class="itemTitle">标题</div>
                        <div class="itemContent">
                            <card v-if="item.type == 'card'" />
                            <tableComponent v-if="item.type == 'table'" />
                            <lineComponent v-if="item.type == 'line'" />
                            <barComponent v-if="item.type == 'bar'" />
                            <pieComponent v-if="item.type == 'pie'" />
                        </div>
                        <div class="itemOperate">
                            <itemOperate :item="item"></itemOperate>
                        </div>
                    </div>
                </grid-item>
            </grid-layout>
        </div>
        <!-- 数据集及基础配置 -->
        <div class="graphConfig">
            <graphConfig />
        </div>
        <!-- 图表选择弹窗 -->
        <el-dialog title="提示" :visible.sync="charDialogOption.show" width="30%">
            <chatDialog v-if="charDialogOption.show" @getCharType="getCharType"></chatDialog>
        </el-dialog>
    </div>
</template>
<script>
import VueGridLayout from 'vue-grid-layout';
import chatDialog from '../charDialog/index.vue';
import itemOperate from "../itemOperate/index.vue";
import card from "../charType/card.vue"
import tableComponent from "../charType/table.vue";
import lineComponent from "../charType/line.vue";
import barComponent from "../charType/bar.vue";
import pieComponent from "../charType/pie.vue";
import graphConfig from "./graphConfig.vue";
import index from "./index"
export default {
    components: {
        GridLayout: VueGridLayout.GridLayout,
        GridItem: VueGridLayout.GridItem,
        chatDialog,
        itemOperate,
        card,
        tableComponent,
        lineComponent,
        barComponent,
        pieComponent,
        graphConfig
    },
    mixins: [index],
    data() {
        return {
            layout: [],
            backLayout:[],
            charDialogOption: {
                show: false
            },
        };
    },
    methods: {
        //新增布局组件
        addLayout() {
            this.charDialogOption.show = true
        },
        //获取选择添加的组件
        getCharType(type) {
            this.charDialogOption.show = false
            let datenowNum = Date.now();
            this.currentGridItem = datenowNum;
            this.layout.unshift({
                x: this.whOption[type].x,
                y: this.whOption[type].y,
                w: this.whOption[type].w,
                h: this.whOption[type].h,
                minW: this.whOption[type].minW,
                maxW: this.whOption[type].maxW,
                minH: this.whOption[type].minH,
                maxH: this.whOption[type].maxH,
                type: type,
                id: datenowNum,
                i: datenowNum,
            })
        },

        //获取当前组件的信息
        getGideItem(item) {
            console.log(item)
        }
    },
    created(){
        for(let i = 0;i < 100; i++){
            this.backLayout.push({
                x:i%12,
                y:parseInt(i/12),
                w:1,
                h:1,
                i:i
            })
        }
    }
}
</script>
<style>
.vue-grid-item.vue-grid-placeholder {
    background: #abdcef !important;
    opacity: 0.4 !important;
}
</style>
<style scoped>
.graphDesign {
    width: 100%;
    height: 100%;
    display: flex;

}

.gridLayoutContainer {
    flex: 1;
}

.graphConfig {
    width: 200px;
    height: 100%;
}


.vue-grid-layout {
    background: #eee;

}

.vue-grid-item:not(.vue-grid-placeholder) {
    /* background: #ccc; */
    /* border: 1px solid black; */
    background-color: #fff;
    border-radius: 4px;

    border: 2px solid #eee;
    /* box-sizing: border-box; */
}

.activeGideItem:not(.vue-grid-placeholder) {
    background-color: #fff;
    border-radius: 4px;
    border: 2px solid #eee;
}

.activeGideItem:not(.vue-grid-placeholder) {
    border-color: rgb(171, 205, 239, 0.5)
}

.vue-grid-item:not(.vue-grid-placeholder):hover {
    border-color: rgb(171, 205, 239, 0.5)
}

.vue-grid-item .resizing {
    opacity: 0.9;
}

.vue-grid-item .static {
    background: #cce;
}

.vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
}

.vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
}

.vue-grid-item .minMax {
    font-size: 12px;
}

.vue-grid-item .add {
    cursor: pointer;
}

.vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    /* background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat; */
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}

.gridItemBox {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;

}

.itemTitle {
    width: calc(100% - 10px);
    font-size: 16px;
    color: #000;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 9px;
    border-bottom: 1px solid #e4e4e4;
}

.itemContent {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 30px;
    font-weight: 400;
}

.itemOperate {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
}
</style>