<template>
    <div class="card-container" :title="num">
        {{ num }}
    </div>
</template>
<script>
export default{
    data(){
        return{
            num:'123,123,200'
        }
    }
}
</script>
<style scoped>
.card-container{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>