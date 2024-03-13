<template>
    <div class="container">
        <hHeader :headConfig="headConfig"></hHeader>
        <hTable :config="tableconfig" :searchForm="searchForm" @handleRow="handleRow">
            <template slot="typeCode" slot-scope="scope">
                <span>{{ scope.scope.row.typeName }}</span>
            </template>
            <template slot="ruleSn" slot-scope="scope">
                <span>{{ scope.scope.row.ruleName }}</span>
            </template>
        </hTable>
    </div>
</template>
<script>
import hTable from './hTable.vue';
import hHeader from "./hHeader.vue"
import mixinsPage from './mixinsPage';
export default {
    components: { hTable, hHeader },
    mixins: [mixinsPage],
    data() {
        return {
            responseData: {
                templateName: "", //模板名称 可忽略
                // chartType:[card（卡片）,line（折线）,bar（柱状图）,pie（饼图）,table（表格）]  前端进行匹配使用什么组件进行渲染
                // chartOption:配置项信息 前端-自己使用
                // dataOption:数据集配置信息
                // layoutOption:位置，宽高信息 前端-自己使用
                templateInfo: [
                    {
                        id: '1708420251843',// 前端-时间戳生成
                        chartType: 'card',
                        layoutOption: {
                            x: 0,
                            y: 0,
                            w: 2,
                            h: 2,
                        },
                        chartOption: {
                            title: {
                                name: 'xxx',
                                fontSize: 12,
                                fontWeight: 400,
                                color: '#abcdef',
                            },
                            content: {
                                fontSize: 12,
                                fontWeight: 400,
                                color: '#abcdef',
                            }
                        },
                        dataOption: {
                            // ...
                        },

                    },
                    {
                        id: '1708420251844',// 前端-时间戳生成
                        chartType: 'line',
                        layoutOption: {
                            x: 2,
                            y: 2,
                            w: 2,
                            h: 2,
                        },
                        chartOption: {
                            title: {
                                name: 'xxx',
                                fontSize: 12,
                                fontWeight: 400,
                                color: '#abcdef',
                            },
                            option: {
                                color: '#abcdef'
                            }
                        },
                        dataOption: {
                            // ...
                        },

                    },
                ]
            },
            //卡片
            responseCard: {
                content: 'xxxx'
            },
            //折线图，柱状图
            responseEchartsLineBar: [
                {
                    name: 'xxx',
                    yData: [120, 132, 101, 134, 90, 230, 210],
                    xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }
            ],
            //饼图
            responseEchartsPie: [
                {
                    name: 'xxx',
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ]
                }
            ],
            //表格
            responseTable:{
                clos:['name1','name2'], //用户勾选表头展示的字段，以及默认展示的字段
                data:[ //表格数据
                    {
                        name1:'xxx',
                        name2:'xxx',
                        name3:'xxx',
                        name4:'xxx'
                    }
                ]
            },
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
}
</style>./mixinsPage