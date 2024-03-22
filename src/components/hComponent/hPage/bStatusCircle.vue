<template>
    <span class="status-circle">
        <span class="s-tag" :class="value.flag ? 'success' : 'fail'"></span>
        <span>
            {{ value.flagLabel[value.flag+''] }}
        </span>
    </span>

</template>
<script>
export default {
    props: {
        value: {
            type: Object,
            default: {}
        }
    }
}

</script>
<style lang="scss" scoped>
.status-circle {
    display: flex;
    align-items: center;

    .s-tag {
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin: 1px 4px 0 0;

        &.success {
            background-color: rgb(0, 168, 84);
        }

        &.fail {
            background-color: rgb(240, 65, 52);
        }
    }
}
</style>