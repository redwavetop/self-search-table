<template>
    <div>
        <div>
            <el-tabs v-model="activeName">
                <el-tab-pane label="数据集" name="data"></el-tab-pane>
                <el-tab-pane label="配置" name="config"></el-tab-pane>
            </el-tabs>
        </div>
        <div class=""></div>
        <div class="">
            <electColor size·="small"></electColor>
        </div>
    </div>
</template>
<script>
import electColor from "../electColor/index.vue"
export default {
    components:{electColor},
    data() {
        return {
            activeName: 'config'
        }
    }
}
</script>