export default {
    data() {
        var validateName = (rule, value, callback) => {
            let regx = new RegExp("^(?!([-_])+$)([-_\u4e00-\u9fffa-zA-Z0-9]+)$");
            let regx1 = new RegExp("(?![\\-\\_]*$)");
            let regx2 = new RegExp("^([\u4e00-\u9fa5]|[a-zA-Z])");
            if (value === '') {
                callback(new Error('请输入名称'));
            } else {
                if (!regx1.test(value)) {
                    callback(new Error('不可输入纯特殊字符'));
                }
                if (!regx.test(value)) {
                    callback(new Error('请输入中文，英文，数字，特殊字符(-_)单项或组合的名称'));
                }

                if (!regx2.test(value)) {
                    callback(new Error('必须以中文或英文开头'));
                }

                callback();
            }
        };
        return {
            drawConfigOption: {
                show: false, //弹窗显示或隐藏
                type: 'add', //弹窗类型
                title: '', //标题名称
                size: 520,// 抽屉宽度
                formItems: [
                    {
                        prop: 'name',
                        label: '计划名称',
                        type: 'elInput',// 展示类型
                        minLength: 0, //最小输入内容长度
                        maxLength: 999, //最大输入内容长度
                        showWordLimit: false, // 是否展示输入的数值
                        rules: [
                            { required: true, message: '请输入计划名称', trigger: ['blur', 'change'] },
                            { validator: validateName, trigger: ['blur', 'change'] }
                        ]
                    },
                    {
                        prop: 'strategySn',
                        label: '上报策略',
                        type: 'elCascader',
                        rules: [
                            { required: true, message: '请选择上报策略', trigger: ['blur', 'change'] },
                        ]
                    },
                    {
                        prop: 'strategySn1',
                        label: '上报策略1',
                        type: 'elCascader',
                        rules: [
                            { required: true, message: '请选择上报策略1', trigger: ['blur', 'change'] },
                        ],
                        slot:true,
                    },
                    {
                        prop: 'taskType',
                        label: '执行周期',
                        type: 'elCascader',
                        rules: [
                            { required: true, message: '请选择执行周期', trigger: ['blur', 'change'] },
                        ],
                        slot:true,
                    },

                ]
            }
        }
    }
}