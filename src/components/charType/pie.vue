emplate>
    <div ref="pieRef" class="char-container"></div>
</template>
<script>
import * as echarts from 'echarts';
export default {
    data() {
        return {
            configOption: {
                color: ['#abcdef', 'red', 'blue']
            },
        }
     },  
    methods: {
        drawEcharts() {
            let char = echarts.init(this.$refs.pieRef);
            let option = {

                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    left: 'center'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['20%', '50%'], //内外半径
                        padAngle: 5, //扇形间隙
                        itemStyle: {
                            borderRadius: 10 // 扇形圆角
                        },
                        roseType: 'radius', // 玫瑰图
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            char.setOption(option);
            window.addEventListener('resize', () => {
                char.resize()
            })
            // 监测dom元素
            this.$erd.listenTo(this.$refs.pieRef, () => {
                this.$nextTick(() => {
                    char.resize()
                })
            })
        }
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