<template>

  <div>
    <button @click="run()">执行</button>
    <button @click="format()">格式化</button>
    <codemirror ref="mycode" :value="curCode" :options="cmOptions" class="code" @ready="onCmReady">
  </codemirror>
  </div>



  
</template>
 
<script>
import { codemirror } from 'vue-codemirror'

import 'codemirror/mode/sql/sql'
import { format } from 'sql-formatter'

import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/hint/xml-hint'
import 'codemirror/addon/hint/sql-hint'
import 'codemirror/addon/hint/anyword-hint'

import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'
import 'codemirror/addon/fold/markdown-fold'
import 'codemirror/addon/fold/xml-fold'
import 'codemirror/addon/fold/indent-fold'


import 'codemirror/addon/search/match-highlighter'

import "codemirror/theme/ambiance.css"; // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
require("codemirror/mode/javascript/javascript"); // 这里引入的模式的js，根据设置的mode引入，一定要引入！！


export default {
  name: 'ExecuteAction',
  data() {
    return {
      curCode: '',
      cmOptions: {
        // autorefresh: true,
        // tabSize: 4,
        // mode: 'text/x-properties',
        // theme: 'ayu-mirage',
        // line: true,
        // viewportMargin: Infinity, //处理高度自适应时搭配使用
        // highlightDifferences: true,
        // autofocus: false,
        // indentUnit: 2,
        // smartIndent: true,
        // readOnly: true, // 只读
        // showCursorWhenSelecting: true,
        // firstLineNumber: 1
        lineNumbers: true, // 显示行号
        mode: 'text/x-sparksql', // 语法model
        gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'], // 语法检查器
       
        theme: "default",
        lint: true, // 开启语法检查,
        lineWrapping: false,
        foldGutter: true, // 启用行槽中的代码折叠
        autoCloseBrackets: true, // 自动闭合符号
        autoCloseTags: true,
        matchTags: { bothTags: true },
        matchBrackets: true, // 在光标点击紧挨{、]括号左、右侧时，自动突出显示匹配的括号 }、]
        styleSelectedText: true,
        styleActiveLine: true,
        autoRefresh: true,
        highlightSelectionMatches: {
          minChars: 2,
          trim: true,
          style: "matchhighlight",
          showToken: false
        },
        hintOptions: {
          completeSingle: false
        }
      }

    }

  },
  components: {
    codemirror
  },
  methods: {
    onCmReady(cm) {
      // 这里的 cm 对象就是 codemirror 对象，等于 this.$refs.myCm.codemirror 
      cm.on("inputRead", (cm, obj) => {
        if (obj.text && obj.text.length > 0) {
          let c = obj.text[0].charAt(obj.text[0].length - 1)
          if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
            cm.showHint({ completeSingle: false })
          }
        }
      })
    },
    //获取
    run(){
      console.log(this.$refs.mycode.codemirror.getValue())
    },
    format(){
      let formatCode = this.$refs.mycode.codemirror.getValue();
      // 格式化代码
      if (formatCode.trim() === '') {
        alert('请先编辑 SQL 命令！')
        return
      }
      this.$refs.mycode.codemirror.setValue(format(formatCode));
    }
  },

}

</script>
 
 
<style scoped>
.information-box>>>.CodeMirror {
  font-family: monospace;
  height: 71vh;
  direction: ltr;
}
</style>