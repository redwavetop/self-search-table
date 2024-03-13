<template>
    <div>
        <el-radio-group v-model="radio">
            <el-radio label="card">卡片</el-radio>
            <el-radio label="table">表格</el-radio>
            <el-radio label="line">折线图</el-radio>
            <el-radio label="bar">柱状图</el-radio>
            <el-radio label="pie">饼图</el-radio>
        </el-radio-group>
        <el-button type="primary" @click="submit()">确定</el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            radio:'card'
        }
    },
    methods:{
        submit(){
            this.$emit('getCharType',this.radio)
        }
    }

}
</script>