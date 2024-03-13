
import { getIncidents, getTypes, getLevel, getRules } from "@/api/manage"
export default {
    data() {
        return {
            //顶部标题以及操作
            headConfig: {
                flexLe: {
                    title: '任务策略'
                },
                flexRi: {

                }
            },

            //顶部操作&&搜索栏
            searchForm: {
                leConditions: [
                    {
                        type: 'button',
                        btnType: 'primary',
                        label: '新 增',
                        value: '',
                        valueName: 'cycle',
                        show: true,
                        hasAuth: '140040102'
                    },
                ],
                /**
                 * riConditions 字段说明
                 * type： 类型 是输入框，下拉框，时间选择框
                 * label：placeholder显示内容
                 * value：绑定的值
                 * valueName：后台查询的字段
                 * 
                 * 下拉框说明  optionConfig：inter为下拉的接口 value：传递后台的字段 label：前端显示的字段
                 * options：下拉数据
                 */
                riConditions: [
                    {
                        type: 'input',
                        label: '策略名称',
                        value: '',
                        valueName: 'name',
                    },
                    {
                        type: 'datetimerange',
                        startlabel: '创建开始时间',
                        endLabel: '创建结束时间',
                        value: '',
                        pickerOptions: '',
                        sLabel:'addTimeStart',
                        eLabel:'addTimeEnd',
                        valueFormat: "yyyy-MM-dd HH:mm:ss",
                        format: "yyyy-MM-dd HH:mm:ss",
                        defaultTime: ['00:00:00', '23:59:59'],
                    }
                    // {
                    //     type: 'select',
                    //     label: '分析规则',
                    //     value: '',
                    //     valueName: 'ruleSn',
                    //     optionConfig: { inter: getRules, value: 'sn', label: 'name' },
                    //     options: []
                    // },
                    // {
                    //     type: 'select',
                    //     label: '事件级别',
                    //     value: '',
                    //     valueName: 'levelCode',
                    //     optionConfig: { inter: getLevel, value: 'code', label: 'name' },
                    //     options: []
                    // },
                ]
            },

            //表格配置
            tableconfig: {
                inter: getIncidents,
                //表格头部
                thead: [
                    //key: 必填
                    //visible: 控制列的显示与隐藏 必填
                    //label: 头部标签
                    //prop:绑定属性值
                    //width:绑定宽度
                    //align:left/center/right 对齐方式  默认左对齐
                    //type:selection-->勾选框  index--> 序号
                    //getOptions :为接口调用的数据请求，注意点，需要1.return promise   2.处理成value label对象数组
                    //options:为静态数据 处理成value label对象数组
                    { key: 1, visible: false, label: '勾选', prop: 'selection', width: '60', type: 'selection', },
                    { key: 0, visible: false, label: '序号', prop: 'index', width: '60', type: 'index', },
                    { key: 2, visible: true, label: '事件名称', prop: 'name', },
                    { key: 3, visible: true, label: '事件级别', prop: 'levelName' },
                    { key: 4, visible: true, label: '事件类型', prop: 'typeCode', headSlot: true, getOptions: { inter: getTypes, value: 'code', label: 'name' } },
                    { key: 5, visible: true, label: '审计专题', prop: 'ruleGroupName', },
                    { key: 6, visible: true, label: '分析规则', prop: 'ruleSn', templateSlot: true },
                    { key: 7, visible: true, label: '关联日志量', prop: 'logCount', },
                    { key: 8, visible: true, label: '发生时间', prop: 'createTime', },
                    // { key: 7, visible: true, label: '状态', prop: 'statusCode', templateSlot: true, width: 100 },
                ],

                //表格操作列设置
                operation: {
                    isShow: true, //是否显示操作列
                    label: '操作',//列名
                    width: '120',
                    fixed: 'right',
                    align: ''
                },
                //功能数据
                btnList: [
                    // {
                    //     type: 'text',
                    //     label: '启用',
                    //     dialog: true, //是否弹窗
                    //     permission: '',
                    //     isShow: ({ statusCode }) => statusCode == 3 //是否展示
                    // },
                    // {
                    //     type: 'text',
                    //     label: '禁用',
                    //     dialog: true, //是否弹窗
                    //     permission: '',
                    //     isShow: ({ statusCode }) => statusCode == 2 //是否展示
                    // },
                    // {
                    //     disabled: ({ statusCode }) => statusCode == 2,
                    //     type: 'text',
                    //     label: '编辑',
                    //     dialog: true, //是否弹窗
                    //     permission: '',
                    // },
                    // {
                    //     disabled: ({ statusCode }) => statusCode == 2,
                    //     type: 'text',
                    //     label: '删除',
                    //     title: '确认删除吗？',
                    //     permission: '',
                    // },
                    {
                        type: 'text',
                        label: '详情',
                        value: 'details', // 用于判断按钮是什么操作
                        permission: '',
                    }
                ],
            },

        }
    },
    methods: {
        //表格操作
        handleRow(idx, row, value) {
            console.log(idx, row, value)
        }
    },
}