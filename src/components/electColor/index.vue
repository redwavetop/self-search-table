<template>
    <div>
        <div class="el-color">
            <div class="el-color-show"></div>
            <div class="el-color-option"></div>
        </div> 

        <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in colorOption" :key="item" :label="item" :value="item">
                <div class="colorItem">
                    <div class="c-item" :key="c" v-for="c in colorObj[item]" :style="'backgroundColor:' + c"></div>
                </div>
            </el-option>
        </el-select>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            colorOption: [
                1, 2, 3
            ],
            colorObj: {
                1: ['red', 'blue', 'green'],
                2: ['blue', 'red', 'green'],
                3: ['green', 'blue', 'red']

            },
            value: ''
        }
    }
}
</script>
<style scoped lang="scss">
.colorItem {
    display: flex;
    justify-content: space-between;
}

.c-item {
    flex: 1;
    height: 30px;
}
</style>