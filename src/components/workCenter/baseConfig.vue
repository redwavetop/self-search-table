<template>
    <div class="config-container">
        <div>
            <el-radio-group v-model="radio">
                <el-radio :label="1">卡片</el-radio>
                <el-radio :label="2">表格</el-radio>
                <el-radio :label="3">折线图</el-radio>
                <el-radio :label="4">柱状图</el-radio>
                <el-radio :label="5">饼图</el-radio>
            </el-radio-group>
        </div>
        <div>
            
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            radio:1
        }
    }
}
</script>
