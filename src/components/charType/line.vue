<template>
    <div ref="lineRef" class="char-container"></div>
</template>
<script>
import * as echarts from 'echarts';
export default {
    data() {
        return {
            configOption: {
                color: ['#abcdef', 'red', 'blue']
            },
            responseData: [
                {
                    name: '模拟数据',
                    yData: [150, 230, 224, 218, 135, 147, 260],
                    xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                {
                    name: '模拟数据1',
                    yData: [155, 210, 204, 118, 105, 107, 160],
                    xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }
            ]
        }
    },
    methods: {
        drawEcharts() {
            let char = echarts.init(this.$refs.lineRef);
            let xData = this.responseData[0].xData;
            let legendData = this.responseData.map(item => {
                return item.name
            })
            let seriesData = this.responseData.map((item, index) => {
                return {
                    name: item.name,
                    type: 'line',
                    stack: 'Total',
                    lineStyle: {
                        color: this.configOption.color[index % this.configOption.color.length]
                    },
                    itemStyle: {
                        color: this.configOption.color[index % this.configOption.color.length]
                    },
                    data: item.yData
                }
            })

            let option = {
                grid: {
                    left: '1%',
                    right: '1%',
                    bottom: '3%',
                    containLabel: true
                },
                legend: {
                    data: legendData
                },
                tooltip: {
                    trigger: 'axis',

                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xData
                },
                yAxis: {
                    type: 'value'
                },
                series: seriesData
            };
            char.setOption(option);
            window.addEventListener('resize', () => {
                char.resize()
            })
            // 监测dom元素
            this.$erd.listenTo(this.$refs.lineRef, () => {
                this.$nextTick(() => {
                    char.resize()
                })
            })
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.drawEcharts()
        })

    }
}


</script>
<style scoped>
.char-container {
    width: 100%;
    height: 100%;
}
</style>
