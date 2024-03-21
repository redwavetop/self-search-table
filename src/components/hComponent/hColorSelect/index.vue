<template>
    <el-popover placement="bottom" v-model="visible">
        <div class="color-select-list">
            <div :class="activeIndex == index ? 'char-form-colors-active' : ''" class="char-form-colors"
                v-for="(item, index) in colorList" :key="index" @click="choiseActiveColor(index)">
                <div class="colors-item" :style="'background-color:' + itemC" v-for="(itemC, indexC) in item"
                    :key="indexC + 'c'"></div>
            </div>
        </div>
        <div class="char-form-colors-ref" slot="reference">
            <div class="colors-item" :style="'background-color:' + itemA" v-for="(itemA, indexA) in activeColor"
                :key="indexA + 'a'"></div>
        </div>
    </el-popover>
</template>

<script>
export default {
    props:{
        colorList:{
            type:Array,
            default:[]
        },
        value: [String, Number,Array],
    },
    model:{
        prop:'value',
        event:'change'
    },
    data() {
        return {
            activeIndex: '',
            activeColor: this.value,
            visible:false
        }
    },
    methods: {
        choiseActiveColor(index) {
            this.visible = false;
            this.activeIndex = index;
            this.activeColor = this.colorList[index];
            this.$emit('change',this.activeColor)
        }
    }
}
</script>

<style lang="scss" scoped>
.color-select-list {
    width: 100%;
    border-radius: 4px;
    max-height: 200px;
    overflow-y: auto;

    .char-form-colors {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 28px;
        border-radius: 4px;
        cursor: pointer;
        padding: 0 10px;
        box-sizing: border-box;
        border: 1px solid hsla(0, 0%, 100%, 0);

        &.chart-form-colors-active {
            border: 1px solid #0d76cf;
        }

        &:hover {
            border: 1px solid #0d76cf;
        }

        .colors-item {
            width: 36px;
            height: 8px;
        }
    }
}

.char-form-colors-ref {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    border-radius: 4px;
    cursor: pointer;
    padding: 0 10px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.3);

    &:hover {
        border: 1px solid #0d76cf;
    }

    .colors-item {
        width: 36px;
        height: 8px;
    }
}
</style>