export default {
    data() {
        return {
            //图表初始化的宽高定义
            whOption: {
                card: {
                    x: 0,
                    y: 0,
                    w: 4,
                    h: 6,
                    minW: 2,
                    maxW: 4,
                    minH: 4,
                    maxH: 8,
                    title: '标题',
                    content: '内容'
                },
                line: {
                    x: 0,
                    y: 0,
                    w: 12,
                    h: 10,
                    minW: 6,
                    maxW: 12,
                    minH: 10,
                    maxH: 16,
                    title: '标题',
                    name: '指标名称',
                    xData: [1, 2, 3, 4, 5],
                    yData: ['周一', '周二', '周三', '周四', '周五']
                },
                bar: {
                    x: 0,
                    y: 0,
                    w: 12,
                    h: 10,
                    minW: 6,
                    maxW: 12,
                    minH: 10,
                    maxH: 16,
                    title: '标题',
                    name: '指标名称',
                    xData: [1, 2, 3, 4, 5],
                    yData: ['周一', '周二', '周三', '周四', '周五']
                },
                pie: {
                    x: 0,
                    y: 0,
                    w: 12,
                    h: 10,
                    minW: 6,
                    maxW: 12,
                    minH: 10,
                    maxH: 16,
                    title: '标题',
                },
                table: {
                    x: 0,
                    y: 0,
                    w: 12,
                    h: 10,
                    minW: 6,
                    maxW: 12,
                    minH: 10,
                    maxH: 16,
                    title: '标题',
                }
            },
            layoutData: {
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
        }
    }
}