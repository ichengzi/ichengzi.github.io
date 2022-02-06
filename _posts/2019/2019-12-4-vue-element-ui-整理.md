## el-table 单元格内容太长

1. `show-overflow-tooltip`属性， 解决中等长度字符串

2. `show-overflow-tooltip`默认整个页面宽度， 可以通过css调整最大宽度

参考： https://www.twblogs.net/a/5c76c7d6bd9eee33991817f0/zh-cn

``` html
<el-table-column prop="desc" label="tooltip换行描述" show-overflow-tooltip></el-table-column>
<style>
  .el-tooltip__popper{font-size: 14px; max-width:50% } /*按50%显示*/
</style> 
```

3. 字符串有换行， 换行符需要正常显示

参考： https://blog.csdn.net/m0_38021769/article/details/100042100

``` html
<el-table-column prop="desc" label="tooltip换行描述" width="140">
    <template slot-scope="scope">
		<el-tooltip class="item" effect="dark" placement="top">
    		<div v-html="ToBreak(scope.row.desc)" slot="content"></div>
    		<div class="oneLine">{{scope.row.desc}}</div>
        </el-tooltip>
    </template>
</el-table-column>

<script>
export default {
    data () {
        return {
            desc: '单果重≥14g，＜14g且≥10g的不达标率＜15%，单果重＜10g的不允许。\n单串重≥500g，＜500g且≥400g的不达标率＜10%，＜400g的不允许'
        }
    },
    methods: {
        // 将 \n 换为 <br/>标签
        ToBreak (val) {
          return val.replace(/(?:\r\n|\n|\r)/g, '<br />')
        }
    }
}
</script>

<style>
.oneLine {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
```

## html字符串保留空白和换行

``` html
<p style="white-space:pre-wrap;">{{msg.detail}}</p>
```