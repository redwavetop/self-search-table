<template>
    <el-drawer :title="configOption.title" :visible.sync="configOption.show" :size="520" :close-on-press-escape="false"
     :wrapper-closable="false">
     <div class="dialogWrapper">
       <div class="main-content" v-loading="load && strategyLoad">
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
               <el-form-item prop="name" label="计划名称">
                   <el-input v-model="ruleForm.name" :maxlength="20" show-word-limit></el-input>
               </el-form-item>
               <el-form-item prop="desc" label="描述">
                   <el-input type="textarea" v-model="ruleForm.desc" :maxlength="50" show-word-limit></el-input>
               </el-form-item>
               <el-form-item prop="strategySn" label="上报策略">
                   <el-cascader ref="strategySnRef" :class="ruleForm.strategyName ? 'strategycascader' : ''"
                       :placeholder="ruleForm.strategyName ? ruleForm.strategyName : '请选择'"
                       :props="{ emitPath: false }" style="width: 100%;" filterable v-model="ruleForm.strategySn"
                       :options="strategyOptions" @change="getStrategySn"></el-cascader>
               </el-form-item>
               <el-form-item prop="taskType" label="执行周期" v-if="ruleForm.taskType">
                   <div class="active-main">
                       <div v-for="it in runTypeList" class="active-list" :key="it.value" v-show="it.value == ruleForm.taskType">
                           <div :class="{ 'active-module-choise': it.value == ruleForm.taskType }"
                               class="every-set-content" @click="changeRunType(it.value)" slot="reference">
                               <el-tooltip class="item" effect="dark" placement="top-start"
                                   :content="handleContent(it.value)">
                                   <span>{{ it.label }}</span>
                               </el-tooltip>
                               <span class="active-img" v-if="it.value == ruleForm.taskType">
                                   <i class="el-icon-check"></i>
                               </span>
                           </div>
                       </div>
                   </div>
               </el-form-item>
               <el-form-item prop="executeTime" label="执行时间" v-if="ruleForm.taskType"> 
                   <el-time-picker v-if="ruleForm.taskType == 'day'" style="width:100%" v-model="ruleForm.executeTime"
                       value-format="HH:mm" format="HH:mm">
                   </el-time-picker>
                   <el-select ref="selectRef" style="width:100%" v-else v-model="ruleForm.executeTime"
                       placeholder="请选择">
                       <el-option v-for="item in timeOptions" :key="item.value" :label="item.label"
                           :value="item.value">
                       </el-option>
                   </el-select>
               </el-form-item>
           </el-form>
       </div>
       <div class="main-bottom">
           <el-button style="width: 100px;height: 30px;" @click="configOption.show = false"> 取消
           </el-button>
           <el-button type="primary" style="width: 100px;height: 30px;margin-right: 20px;"
               @click="saveData('ruleForm')">
               确定
           </el-button>
       </div>
   </div>
   </el-drawer>
</template>