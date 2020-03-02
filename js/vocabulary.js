new Vue({
    el:"#body",
    data:{
        ok:true,
        loading:false,
        activeName:"first",//卡片页，默认第一页
        essayList:[] ,//文献列表
        essayData:"",//具体文献对象
        wordData:[],
        updateWord:{},
        isUpdated:false,//是否修改单词
        selects_cha:[//词性选择数据
          {label:"名词",value:"n."},
          {label:"动词",value:"v."},
          {label:"形容词",value:"adj."},
          {label:"副词",value:"adv."},
          {label:"连词",value:"conj."},
          {label:"介词",value:"prep."},
          {label:"冠词",value:"art."},
          {label:"代词",value:"pron."},
          {label:"数词",value:"num."},
          {label:"感叹词",value:"interj."}
        ], 
        form: {//表单信息
          word: '',
          character: '',
          interpretation: '',
          pronounciation: '',
          difficulty: '',
          eng_expl: '',
          chs_expl: '',
          picture:'null'//默认为无插图
        },
        //检查表单规则
        isError:{
          word: false,
          character: false,//词性必有，无需检查
          interpretation: false,
          pronounciation: false,
          difficulty: false,
          eng_expl: false,
          chs_expl: false,
          picture:false
        },
        isUError:{
          word: false,
          character: false,//词性必有，无需检查
          interpretation: false,
          pronounciation: false,
          difficulty: false,
          eng_expl: false,
          chs_expl: false,
          picture:false
        }
    },
    methods:{
        handleClick(tab, event) {
            //console.log(tab, event);
        },
        handleSelect(key, keyPath) {
          //文献导航栏选中时触发，key就是文献名
          this.loading=true;
          this.$http.post('php/query_essay.php',{type : key},
          {emulateJSON:true}).then(function(res){
              if( res.body=="0"){
                  this.$message({
                      message: '没有此文献呢(ಥ _ ಥ)',
                      type: 'warning'
                      });
              }else{
                var result=res.body;
                //显示带原格式的文献内容
                this.essayData=result;
                this.loading=false;
              }
                  
          },function(){
              console.log('请求失败处理');
          });
          console.log(key, keyPath);
        },
        handleEdit(index, row) {
          //唤出修改单词表单
          this.updateWord=row;
          this.isUpdated=true;
          console.log(index, row);
        },
        handleDelete(index, row) {
          //处理删除单词事件
          this.$confirm('真的要删除它🐎?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //确定删除后，把单词、词性作为参数（主键）发送至后台
            this.$http.post('php/delete_word.php',{word : row.word, character:row.character},
            {emulateJSON:true}).then(function(res){
              if(res.body){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });  
                //在数据库中删除完之后把数组中的元素删除
                this.wordData.splice(index, 1);
              }else{
                this.$message({
                  type: 'error',
                  message: '删除成功!'
                }); 
              }
                
            },function(){
                console.log('请求失败处理');
            });
            
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
          console.log(row.word);
        },
        //检查表单，通过传入代表element的数字进行选择元素
        checkForm:function(ele){
          switch(ele){
            case 1:
              if(isEmpty(this.form.word)){             
                this.isError.word=true;
              }else{
                var reg=/^[a-zA-Z]{1,}$/;
                this.isError.word=!(reg.test(this.form.word));
              }
              break;
            case 2:
              //三目运算符，节省代码
              //isEmpty(this.form.character) ? this.isError.character=true : this.isError.character=false; 
              break;
            case 3:
              //保留
              break;
            case 4:
            if(isEmpty(this.form.pronounciation)){
              this.isError.pronounciation=true;
            }else {
              //音标的组成非常复杂，暂不知道怎么匹配
              //只能先排除汉字和数字
              var reg=/[\u4E00-\u9FA5]{1,}|[0-9]/;
              this.isError.pronounciation=reg.test(this.form.pronounciation);
            }
            break;
            case 5:
              //其实难度没有必要判断，因为当它失焦的时候必有属性
              isEmpty(this.form.difficulty) ? this.isError.difficulty=true : this.isError.difficulty=false;
              break;
            case 6:
              if(isEmpty(this.form.eng_expl)){
                this.isError.eng_expl=true;
              }else{
                //排除汉字
                var reg=/[\u4E00-\u9FA5]{1,}/;
                this.isError.eng_expl=reg.test(this.form.eng_expl);
              }
              break;
            case 7:
                if(isEmpty(this.form.chs_expl)){
                  this.isError.chs_expl=true;
                }else{
                  //排除字母
                  var reg=/[a-zA-Z]{1,}/;
                  this.isError.chs_expl=reg.test(this.form.chs_expl);
                }
            break;
          }
          
        },
        onSubmit:function(){
          //提交表单前需要检查表单，全部填完并且符合验证规则才能提交（插图也要）
          //状态变量
          var status1=0
          //注意：这里是遍历对象
          for(var f in this.form){
            if(this.form[f]===""){
              status1++
            }
          }
          //console.log("status1",status1)
          if(status1==0){//status1>0表示还有项没有填完
            let status2=0
            for(var err in this.isError){
              if(this.isError[err]) {
                status2++
              }        
            }
            if(status2>0){////status2>0表示还有项输入不规范
              //不提交，给出提示
              console.log("cuowu")
              this.$message({
                message: '表还有数据错误呢',
                type: 'warning'
                });
            }else{
              //添加元素时判断该种词性的单词是否存在
              //存在则不添加，给出提示
              if(isExist(this.form.word,this.form.character,this.wordData)>0){
                this.$notify.error({
                  title: '错误',
                  message: this.form.word+"("+this.form.character+")"+"已存在"
                });  
              }else{

                //一定要先执行上传文件
                //文件验证成功并且上传成功后传递表单
                if(this.uploadFile('uploadPic')){
                  this.$http.post('php/input_word.php',{form : this.form},
                  {emulateJSON:true}).then(function(res){
                    //console.log(res.body);
                    this.$message({
                      message: '添加成功',
                      type: 'success'});
                      //添加成功后加入数组，更新数据
                      this.wordData.push(this.form);    
                  },function(){
                    this.$message({
                      message: '添加失败，请重试',
                      type: 'error'});
                      //console.log('请求失败处理');
                  });
                }else{
                  this.$message({
                    message: '文件好像不符合规范哦',
                    type: 'warning'});
                }
              }
            }
          }else{
            console.log("wanshan")
            this.$message({
              message: '请继续完善表单🐷',
              type: 'warning'
              });
          }
        },
        uploadFile:function(ele){
          var commit;
          //原生js的file对象获取文件对象
          var oFile = document.getElementById(ele).files[0];
          
            //只接受png、jpg格式、小于1M的图片,
            if(oFile.type=="image/png" || oFile.type=="image/jpg" || oFile.type=="image/jpeg"){
              console.log(oFile.size)
              if(oFile.size<1024000){
                let formData = new FormData();
                formData.append('uploadFile', oFile);
                let url = 'php/upload_pic.php' ;
                let config = {
                  headers:{'Content-Type':'multipart/form-data'}//文件类型的请求头，超级重要
                };                
                //Ajax提交文件
                axios.post(url,formData, config).then(function (response) {
                  //在里面不能对外部的变量进行修改
                  if(response.data===0){
                    //console.log(response.data)                  
                    this.$message({
                      message: '插图上传失败了',
                      type: 'warning'
                      });
                  }                 
                  })
                  this.form.picture="imgs/pictures/"+oFile.name;//上传插图成功后，把文件路径赋值在表单中
                  //console.log("name:",this.form.picture);
                  commit=true;
              }else{
                commit=false;
              }
            }else{
              commit=false;
            }
          
          

           return commit;
        },
        submitUpload() {
          let count=0;
          var essayForm=document.getElementById('uploadEssay');
          var file1=document.getElementById('essay1').files[0];
          var file2=document.getElementById('essay2').files[0];
          var file3=document.getElementById('essay3').files[0];
          var file4=document.getElementById('essay4').files[0];
          if(file1!=null) if(file1.type!="text/plain") count++;
          if(file2!=null) if(file2.type!="text/plain") count++;
          if(file3!=null) if(file3.type!="text/plain") count++;
          if(file4!=null) if(file4.type!="text/plain") count++;
          if(file1==null && file2==null &&file3==null &&file4==null){
            this.$message({
              message: '请至少选择一个文件呢',
              type: 'warning'
              });
           //console.log(count)
          }else if (count!=0){
            this.$message({
              message: '混入了非txt奸细－O－',
              type: 'warning'
              });
          }else{
            //验证通过，允许提交
            essayForm.submit();
          }
        },
        onUpdate:function(){
          //提交表单前需要检查表单，全部填完并且符合验证规则才能提交（插图也要）
          //状态变量
          var status1=0
          //注意：这里是遍历对象
          for(var f in this.updateWord){
            if(this.updateWord[f]===""){
              status1++
            }
          }
          //console.log("status1",status1)
          if(status1==0){//status1>0表示还有项没有填完
            let status2=0
            for(var err in this.isUError){
              if(this.isUError[err]) {
                status2++
              }        
            }
            if(status2>0){////status2>0表示还有项输入不规范
              //不提交，给出提示
              this.$message({
                message: '表还有数据错误呢',
                type: 'warning'
                });
            }else{
              console.log(this.updateWord)
              //一定要先执行上传文件
              //文件验证成功并且上传成功后传递表单
              if(this.uploadFile('updatePic')){
                this.$http.post('php/update_word.php',{form : this.updateWord},
                {emulateJSON:true}).then(function(res){
                  console.log(res.body);
                  this.$message({
                    message: '添加成功',
                    type: 'success'});
                    //添加成功后加入数组，更新数据
                    this.wordData.push(this.updateWord);    
                },function(){
                  this.$message({
                    message: '添加失败，请重试',
                    type: 'error'});
                });
              }else{
                this.$message({
                  message: '文件好像不符合规范哦',
                  type: 'warning'});
              }
            }
          }else{ 
            this.$message({
              message: '请继续完善表单🐷',
              type: 'warning'
              });
          }
        },
        //检查修改表单，通过传入代表element的数字进行选择元素
        checkUForm:function(ele){
          switch(ele){
            case 1:
              if(isEmpty(this.updateWord.word)){             
                this.isUError.word=true;
              }else{
                var reg=/^[a-zA-Z]{1,}$/;
                this.isUError.word=!(reg.test(this.updateWord.word));
              }
              break;
            case 2:
              //三目运算符，节省代码
              //isEmpty(this.form.character) ? this.isError.character=true : this.isError.character=false; 
              break;
            case 3:
              //保留
              break;
            case 4:
              if(isEmpty(this.updateWord.pronounciation)){
                this.isUError.pronounciation=true;
              }else {
                //音标的组成非常复杂，暂不知道怎么匹配
                //只能先排除汉字和数字
                var reg=/[\u4E00-\u9FA5]{1,}|[0-9]/;
                this.isUError.pronounciation=reg.test(this.updateWord.pronounciation);
              }
              break;
            case 5:
              //其实难度没有必要判断，因为当它失焦的时候必有属性
              isEmpty(this.updateWord.difficulty) ? this.isUError.difficulty=true : this.isUError.difficulty=false;
              break;
            case 6:
              if(isEmpty(this.updateWord.eng_expl)){
                this.isUError.eng_expl=true;
              }else{
                //排除汉字
                var reg=/[\u4E00-\u9FA5]{1,}/;
                this.isUError.eng_expl=reg.test(this.updateWord.eng_expl);
              }
              break;
            case 7:
                if(isEmpty(this.updateWord.chs_expl)){
                  this.isUError.chs_expl=true;
                }else{
                  //排除字母
                  var reg=/[a-zA-Z]{1,}/;
                  this.isUError.chs_expl=reg.test(this.updateWord.chs_expl);
                }
            break;
          }
          
        },
        cancelUpdate:function(){
          this.isUpdated=false;
        }
    },
    created: function () {
        // 创建Vue实例前的钩子，请求获得词汇列表        
        this.$http.post('php/query_word.php',{type : 3},
        {emulateJSON:true}).then(function(res){
            if(typeof res.body=="string"){
                this.$message({
                    message: '词库空空如也(　o=^•ェ•)o　┏━┓',
                    type: 'warning'
                    });
            }else{
                this.wordData=res.body;
                //console.log(this.wordData[0].pronunciation)
            }
                
        },function(){
            console.log('请求失败处理');
        });
        //获得文献列表
        this.$http.post('php/query_essay.php',{type : "all"},
        {emulateJSON:true}).then(function(res){
            //console.log(res.body)
            if(typeof res.body=="string"){
                this.$message({
                    message: '暂时还没有文献哦(ಥ _ ಥ)',
                    type: 'warning'
                    });
            }else{
                this.essayList=res.body;
                //
            }
                
        },function(){
            console.log('请求失败处理');
        });
      }

})

//检查是否为空
function isEmpty (value)  {   
  return value === '';
};

/**
 * 检查是元素否存在，防止重复添加
 * @param {检验数组类型：1文献数组；2词汇数组} type 
 * @param {待校验的数组} arr 
 * @return 存在返回true
 */
function isExist(target,cha,arr){
  let res=0;
  
  for(var ele in arr){
    if(target===arr[ele].word&&cha===arr[ele].character){
      res=true;
    }
  }
  
  return res;
}