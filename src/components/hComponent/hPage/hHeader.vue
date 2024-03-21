<template>
    <div class="headeContainer">
        <div class="le_head">
            <span>{{ headConfig.flexLe.title }}</span>
        </div>
        <div class="ri_head"></div>
    </div>
</template>
<script>
export default {
    props: {
        headConfig: {
            type: Object,
            default: () => { }
        }
    }
}

</script>
<style lang="scss" scoped>
.headeContainer {
    width: 100%;
    height: 44px;
    padding-bottom: 10px;
    font-family: "PingFang SC ", "PingFang SC", sans-serif;
    font-style: normal;
    font-size: 16px;
    color: #333;
    line-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-bottom: 1px solid #e9e9e9;

    .le_head {
        padding-left: 20px;
    }
}
</style>