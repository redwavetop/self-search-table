<template>
    <div class="content">
        <!-- 搜索条件区 -->
        <div class="searchFrom">
            <div class="le_condition">
                <div class="le_condition_item" :class="itemLe.show ? 'showMargin' : 'hideMargin'"
                    v-for="(itemLe, indexLe) in searchForm.leConditions" :key="indexLe">
                    <el-radio-group v-model="itemLe.value" v-if="itemLe.type == 'radioGroup'" @change="submit">
                        <el-radio-button :label="itRadio.value" v-for="itRadio in itemLe.list" :key="itRadio.value"> <i
                                style="font-size: 12px;margin-right: 5px;" v-if="itRadio.icon" class="iconfont"
                                :class="itRadio.icon"></i>{{
                                    itRadio.label }}</el-radio-button>
                    </el-radio-group>
                    <el-button v-hasAuth="itemLe.permission" style="width: 80px;"
                        v-if="itemLe.type == 'button' && itemLe.show" :type="itemLe.btnType"
                        @click="leBtnOperate(itemLe.valueName)" :disabled="itemLe.disabled">{{
                            itemLe.label
                        }}</el-button>
                </div>
            </div>
            <div class="ri_condition">
                <div :class="indexRi == searchForm.riConditions.length - 1 ? 'last_condition_item' : ''"
                    class="ri_condition_item" v-for="(itemRi, indexRi) in searchForm.riConditions" :key="indexRi">
                    <el-button v-show="itemRi.show" v-if="itemRi.type == 'button'" :type="itemRi.btnType"
                        @click="riBtnOperate(itemRi.valueName)" :disabled="itemRi.disabled" v-hasAuth="itemRi.permission">{{
                            itemRi.label
                        }}</el-button>
                    <el-checkbox v-model="itemRi.value" v-if="itemRi.type == 'checkbox'">备选项</el-checkbox>
                    <el-input v-model="itemRi.value" :placeholder="itemRi.label" v-if="itemRi.type == 'input'"
                        clearable></el-input>

                    <el-select v-if="itemRi.type == 'filterSelect'" v-model="itemRi.value" filterable
                        :placeholder="itemRi.label" clearable>
                        <el-option v-for="item in itemRi.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>

                    <el-select v-if="itemRi.type == 'select'" v-model="itemRi.value" :placeholder="itemRi.label" clearable>
                        <el-option v-for="item in itemRi.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>

                    <el-date-picker v-if="itemRi.type == 'datetimerange'" v-model="itemRi.value" type="datetimerange"
                        :picker-options="itemRi.pickerOptions" range-separator="至" :start-placeholder="itemRi.startlabel"
                        :end-placeholder="itemRi.endLabel" align="right" clearable :value-format="itemRi.valueFormat"
                        :default-time="itemRi.defaultTime">
                    </el-date-picker>

                    <div class="active-main" v-if="itemRi.type == 'sCheckBoxGroup'">
                        <div v-for="it in itemRi.list" class="active-list" :key="it.value">
                            <div :class="{ 'active-module-choise': it.value == itemRi.value }" class="every-set-content"
                                @click="itemRi.value = it.value" slot="reference">
                                <span>{{ it.label }}</span>
                                <span class="active-img" v-if="it.value == itemRi.value">
                                    <i class="el-icon-check"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="self-search-but" @click="submit()">
                    <i class="el-icon-search"></i>
                </div>
            </div>
        </div>
        <!-- 表格区 -->
        <div ref="table" class="table common-list-content" v-loading="loading">
            <el-table :data="tableData" v-if="headslotLoading" :max-height="maxHeight" empty-text="暂无数据"
                @selection-change="handleSelectionChange">
                <template v-for="item in config.thead">
                    <!-- 序列 -->
                    <el-table-column v-if="item.type == 'index' && item.visible" type="index" :label="item.label"
                        :width="item.width ? item.width : 'auto'" :key="item.prop"
                        :align="item.align ? item.align : 'left'" />
                    <!-- 勾选框 -->
                    <el-table-column v-if="item.type == 'selection' && item.visible" type="selection" :key="item.prop"
                        :width="item.width ? item.width : 'auto'" :align="item.align ? item.align : 'left'" />
                    <!-- 插槽自定义内容-->
                    <el-table-column v-if="item.templateSlot && item.visible" :key="item.prop" v-bind="item"
                        show-overflow-tooltip :align="item.align ? item.align : 'left'"
                        :width="item.width ? item.width : 'auto'">
                        <template slot-scope="scope">
                            <slot :name="item.prop" :scope="scope"></slot>
                        </template>
                    </el-table-column>
                    <!-- 普通展示 -->
                    <el-table-column v-if="item.visible && (!item.templateSlot) && (!item.headSlot)" :key="item.prop"
                        v-bind="item" show-overflow-tooltip :align="item.align ? item.align : 'left'"
                        :width="item.width ? item.width : 'auto'" />
                    <!-- 插槽自定义表头带过滤内容 -->
                    <el-table-column v-if="item.headSlot && item.visible" :key="item.prop" v-bind="item"
                        show-overflow-tooltip :align="item.align ? item.align : 'left'"
                        :width="item.width ? item.width : 'auto'">
                        <template slot-scope="scope" slot="header">
                            <div class="slot-filter">
                                <span>{{ item.label }}</span>
                                <el-popover placement="bottom" trigger="manual" popper-class="headslotpop" width="auto"
                                    v-model="headSlot[item.prop].show">
                                    <el-checkbox :indeterminate="headSlot[item.prop].isIndeterminate"
                                        v-model="headSlot[item.prop].checkAll"
                                        @change="(val) => handleCheckAllChange(val, item.prop)">全选</el-checkbox>
                                    <el-checkbox-group v-model="headSlot[item.prop].checkedData"
                                        @change="(val) => handleCheckedChange(val, item.prop)">
                                        <el-checkbox v-for="itemslot in headSlot[item.prop].options" :label="itemslot.value"
                                            :key="itemslot.value">{{ itemslot.label }}</el-checkbox>
                                    </el-checkbox-group>
                                    <div class="sure"
                                        :class="headSlot[item.prop].checkedData.length > 0 ? 'canOperate' : 'cantOperate'"
                                        @click="headSlot[item.prop].checkedData.length > 0 ? headslotSearch(item.prop) : null">
                                        确定</div>
                                    <img slot="reference" src="./images/filter.png" alt="" class="h-filter-img"
                                        @click="headSlot[item.prop].show = !headSlot[item.prop].show">
                                </el-popover>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <slot :name="item.prop" :scope="scope"></slot>
                        </template>
                    </el-table-column>
                </template>

                <!-- 操作部分 -->
                <el-table-column v-if="config.operation.isShow" v-bind="config.operation"
                    :align="config.operation.align ? config.operation.align : 'left'" :fixed="config.operation.fixed">
                    <template slot-scope="scope">
                        <template v-for="itemBtn, indexBtn in config.btnList">
                            <el-button :key="indexBtn" v-bind="itemBtn"
                                :disabled="itemBtn.disabled ? itemBtn.disabled(scope.row) : false"
                                v-if="itemBtn.isShow ? itemBtn.isShow(scope.row) : true" :type="itemBtn.type"
                                @click.native.prevent="handleRow(scope.$index, scope.row, itemBtn.value)">{{ itemBtn.label
                                }}</el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页区域-->
            <div class="pagination">
                <el-pagination :current-page.sync="pageQuery.index" :page-sizes="pagesizes" :page-size="pageQuery.size"
                    layout="total, sizes, prev, pager, next, jumper" :total="total" background
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'hTable',
    props: {
        config: {
            type: Object,
            default: () => { }
        },
        searchForm: {
            type: Object,
            default: () => { }
        }
    },
    // 监听数据
    watch: {
        config: {
            handler(newVal) {
            },
            deep: true,
            immediate: true
        }
    },
    data() {
        return {
            slotShow: false,
            pageQuery: {
                size: 10, //每页条数
                index: 1, //当前第几页
            },
            pagesizes: [10, 20, 30, 50], //每页分页方式
            total: 0,//总条数,
            loading: false, // 加载
            headslotLoading: true, //表头下拉是接口获取的
            tableData: [], //表格数据
            headSlot: {}, // 头部有插槽的对象集合
            searchFormData: {}, //表格顶部的条件搜索
            maxHeight: 0
        }
    },
    methods: {

        // 选中的数据
        handleSelectionChange(val) {
            console.log(val)
            this.$emit('handleSelChange', val)
        },

        // 操作按钮
        handleRow(idx, row, value) {
            this.$emit('handleRow', idx, row, value)
        },

        //提交搜索条件
        submit() {
            //循环左侧的操作数据
            this.searchForm.leConditions.forEach(itemLe => {
                this.$set(this.searchFormData, itemLe.valueName, itemLe.value)
            })
            //循环左侧的操作数据
            this.searchForm.riConditions.forEach(itemRi => {
                if(itemRi.type === 'datetimerange'){
                    this.$set(this.searchFormData, itemRi.sLabel, itemRi.value[0]);
                    this.$set(this.searchFormData, itemRi.eLabel, itemRi.value[1])
                }else{
                    this.$set(this.searchFormData, itemRi.valueName, itemRi.value)
                }
            })
            this.getTableData()
        },

        //按钮事件
        leBtnOperate(type) {
            this.$emit('btnOperate', type)
        },
        riBtnOperate(type) {
            this.$emit('btnOperate', type)
        },
        //重置操作
        reset() {
            //循环左侧的操作数据
            this.searchForm.leConditions.forEach(itemLe => {
                itemLe.value = "";
            })
            //循环左侧的操作数据
            this.searchForm.riConditions.forEach(itemRi => {
                itemRi.value = "";
            })
        },

        // 换页
        handleSizeChange(val) {
            this.pageQuery.size = val;
            this.getTableData()
        },
        // 换码
        handleCurrentChange(val) {
            this.pageQuery.index = val;
            this.getTableData()
        },

        //头部勾选的确定操作
        //1.关闭popover
        //2.表格筛选
        headslotSearch(prop) {
            this.headSlot[prop].show = false;
            this.getTableData()
        },

        //单个选
        handleCheckedChange(val, prop) {
            let checkcount = val.length;
            this.headSlot[prop].checkAll = checkcount === this.headSlot[prop].options.length;
            this.headSlot[prop].isIndeterminate = checkcount > 0 && checkcount < this.headSlot[prop].options.length
        },

        //全选
        handleCheckAllChange(val, prop) {
            this.headSlot[prop].isIndeterminate = false;
            let checkedData = this.headSlot[prop].options.map(it => {
                return it.value
            })
            this.headSlot[prop].checkedData = val ? checkedData : [];
        },

        //顶部搜索条件添加下拉数据获取
        addSearchFormData() {
            this.searchForm.riConditions.forEach(itemRi => {
                if (itemRi.optionConfig) {
                    this.allFetchData(itemRi.optionConfig).then(res => {
                        itemRi.options = res
                    })
                }
            })
        },


        //给头部的对象添加属性
        addHeadSlotProp() {
            let headData = [];
            this.config.thead.forEach(item => {
                if (item.headSlot) {
                    //通过接口获取
                    if (item.getOptions) {
                        headData.push(
                            {
                                prop: item.prop,
                                getOptions: item.getOptions
                            }
                        )
                    }
                    //静态数据
                    if (item.options) {
                        this.$set(this.headSlot, props[index], {
                            isIndeterminate: false, // 全选状态
                            checkAll: true, //是否全选
                            checkedData: checkedData,// 选中的数据组
                            options: item.optios,//多选的勾选数据
                            show: false
                        })
                    }
                }
            })

            if (headData.length) {
                this.headslotLoading = false;
                let functions = headData.map(item => {
                    return this.allFetchData(item.getOptions)
                })
                let props = headData.map(item => {
                    return item.prop
                })
                let p = Promise.all(functions);
                //接口获取完成显示
                p.then(arr => {
                    arr.forEach((item, index) => {
                        let checkedData = item.map(it => {
                            return it.value
                        })
                        this.$set(this.headSlot, props[index], {
                            isIndeterminate: false, // 全选状态
                            checkAll: true, //是否全选
                            checkedData: checkedData,// 选中的数据组
                            options: item,//多选的勾选数据
                            show: false
                        })
                        this.headslotLoading = true;
                    })
                })
            }
        },

        //顶部搜索和表格头部接口获取
        //inter: 接口名称
        //需要处理成的value,label  
        allFetchData(configOptions) {
            return new Promise((resolve, reject) => {
                configOptions.inter(configOptions.params).then(res => {
                    if (res.code == 0) {
                        let arr = res.data.result;
                        let newArr = arr.map(item => {
                            return {
                                value: item[configOptions.value],
                                label: item[configOptions.label]
                            }
                        })
                        resolve(newArr)
                    } else {
                        reject(res)
                    }
                })
            })
        },

        //获取表格数据
        getTableData() {
            if (this.config.inter) {
                //处理表头的筛选
                let headSlotParams = {}
                for (let prop in this.headSlot) {
                    //如果是全选的情况，则传空
                    if (this.headSlot[prop].checkAll) {
                        this.$set(headSlotParams, prop, "")
                    } else {
                        let str = this.headSlot[prop].checkedData.join(',');
                        this.$set(headSlotParams, prop, str)
                    }
                }
                this.loading = true;
                this.config.inter({ ...this.pageQuery, ...headSlotParams, ...this.searchFormData }).then(res => {
                    if (res.code == 0) {
                        this.loading = false;
                        this.total = res.data.total || res.data.result.page.records;
                        this.tableData = res.data.result.results || res.data.result;
                    }
                })
            }

        },
        //获取表格的最大高度
        getTableMaxHeight() {
            const height = this.$refs.table.offsetHeight;
            this.maxHeight = height - 52
        }
    },
    created() {
        this.addSearchFormData()
        this.addHeadSlotProp()
        this.getTableData()
    },
    mounted() {
        this.$nextTick(() => {
            this.getTableMaxHeight()
        })
        window.addEventListener('resize', this.getTableMaxHeight)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.getTableMaxHeight)
    }
}
</script>
   
<style lang="scss" scoped>
.content {
    margin: 10px;
    padding: 0 20px 20px 20px;
    width: calc(100% - 60px);
    height: calc(100% - 95px);
    background-color: #fff;
    border-radius: 4px;
    display: flex;
    flex-direction: column;

    .searchFrom {
        width: 100%;
        height: 32px;
        margin: 20px 0;
        display: flex;
        position: relative;
        align-items: center;

        .le_condition {
            position: absolute;
            left: 0;
            display: flex;
            align-items: center;

            .le_condition_item {
                margin-right: 20px;

                &.showMargin {
                    margin-right: 20px;
                }

                &.hideMargin {
                    margin-right: 0;
                }
            }
        }

        .ri_condition {
            position: absolute;
            right: 0;
            display: flex;
            align-items: center;

            .last_condition_item {
                ::v-deep .el-input__inner {
                    border-top-right-radius: 0px !important;
                    border-bottom-right-radius: 0px !important;
                }

            }

            .ri_condition_item {
                margin-left: 20px;


            }

            .active-main {
                display: flex;
                align-items: center;
                padding: 0px;

                .active-list {
                    width: 80px;

                    &.isShowList {
                        display: none;
                    }

                }

                .active-module-choise {
                    color: var(--systemBaseThemeColor) !important;
                    border-color: var(--systemBaseThemeColor) !important;
                }

                .every-set-content {
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    width: 80px;
                    font-size: 12px;
                    border: 1px solid #dcdfe6;
                    position: relative;
                    cursor: pointer;
                    color: #606266b2;
                    margin: 0;
                    font-size: 15px;
                    border-radius: 2px;

                    .active-img {
                        position: absolute;
                        top: -14px;
                        right: -14px;
                        z-index: 2;
                        width: 0;
                        height: 0;
                        border-top: 14px solid transparent;
                        border-bottom: 14px solid transparent;
                        border-right: 14px solid transparent;
                        border-left: 14px solid var(--systemBaseThemeColor);
                        transform: rotate(-45deg);

                        i {
                            position: absolute;
                            color: #fff;
                            font-size: 12px;
                            transform: rotate(45deg) scale(0.9);
                            top: -5px;
                            left: -16px;
                        }
                    }

                }

            }

            .self-search-but {
                border: 1px solid #dcdfe6;
                border-left: 0;
                border-radius: 4px;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                width: 45px;
                height: 30px;
                line-height: 31px;
                background: #f5f7fa;
                text-align: center;
                cursor: pointer;

                &:hover {
                    opacity: 0.8;
                }

                i {
                    font-size: 13px;
                    color: #96999f;
                }
            }
        }
    }

    .table {
        width: 100%;
        height: calc(100% - 72px);
        min-height: 200px;

        .slot-filter {
            display: flex;
            align-items: center;

            .h-filter-img {
                margin-left: 5px;
                width: 12px;
                cursor: pointer;
            }
        }

        .pagination {
            width: 100%;
            margin-top: 20px;
            display: flex;
            flex-direction: row-reverse;
        }
    }


}

.common-list-content {

    // padding-top: 10px;
    .table-only-text-search {
        margin-bottom: 20px;
        // display: contents;

        .el-input {
            // margin-bottom: 10px;
        }

        ::v-deep .el-input-group__append {
            padding: 0;

        }
    }

    .top-button {
        // background: var(--systemLightThemeColor);
        // padding: 0 12px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;

        ::v-deep .is-setting-butText {
            i {
                font-size: 14px;
            }
        }
    }

    ::v-deep .global-base-list-container {
        padding: 0 !important;
    }

    ::v-deep .common-search-wrap {
        .el-form-item {
            margin-bottom: 20px;
        }
    }

    ::v-deep .el-button--small:not(.el-button--text) {
        line-height: initial;
        padding: 7px 15px;
    }

    ::v-deep .el-table {
        .cell {
            font-size: var(--systemBaseTextSize);
        }
    }

    .el-dropdown {
        font-size: 12px;
    }
}

::v-deep .el-table thead {
    color: #000000d8;
}
</style>
<style>
.headslotpop .el-checkbox-group {
    display: flex;
    flex-direction: column;
}

.headslotpop .el-checkbox {
    margin-top: 6px;
}

.headslotpop .sure {
    border-top: 1px solid #eee;
    width: 100%;
    height: 30px;
    margin-top: 5px;
    text-align: center;
    line-height: 40px;
}

.headslotpop .sure.canOperate {
    cursor: pointer;
    color: var(--systemBaseThemeColor);
}

.headslotpop .sure.cantOperate {
    cursor: not-allowed;
}
</style>
   