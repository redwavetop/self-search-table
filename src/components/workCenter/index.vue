<template>
    <div class="wrapper">
        <div class="top-container">
            <div class="tabs-container">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="基础配置" name="1"></el-tab-pane>
                    <el-tab-pane label="图表设计" name="2"></el-tab-pane>
                </el-tabs>
            </div>
            <div>
                <el-button type="primary" @click="addLayout()">新增组件</el-button>
            </div>
        </div>
        <div class="bot-container">
            <baseConfig v-show="activeName == 1" />
            <graphDesign ref="graphDesign" v-show="activeName == 2" />
        </div>
    </div>
</template>
<script>
import baseConfig from './baseConfig.vue';
import graphDesign from "./graphDesign.vue"
export default{
    components:{
        baseConfig,
        graphDesign
    },
    data(){
        return{
            activeName: '1',
        }
    },
    methods:{
        addLayout(){
            this.$refs.graphDesign.addLayout()
        }
    }
}
</script>


<style scoped>
.wrapper {
    width: 100%;
    height: 100%;
    background: #eee;
}

.top-container{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
}
.bot-container{
    width: 100%;
    height: calc(100% - 50px);
}


.vue-grid-layout {
    background: #eee;

}



.vue-grid-item:not(.vue-grid-placeholder) {
    /* background: #ccc; */
    /* border: 1px solid black; */
    background-color: #fff;
    border-radius: 4px;

    border: 2px solid #fff;
    /* box-sizing: border-box; */
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