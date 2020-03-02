var body=new Vue({
    el:'#body',
    data:{
        queried:"0",
        user:{
            name:"",
            pwd:""
        },
        type:"1",//查找类型：中-英/英-中
        q_word:"",
        words:[],//单词数组
        //组件所需的数据
        tabPosition:"top",
        tabs:[{
            style:"el-icon-reading",
            text:"词汇",
            event:"goVocabulary"},{
            style:"el-icon-document",
            text:"TXT文献",
            event:"goVocabulary"},{
            style:"el-icon-document-copy",
            text:"生词本",
            event:"goVocabulary"
            }],
        fontColor:"black"
    },
    methods:{
        //参数q_type:查询类型，精准1/模糊2
        queryWord:function(q_type){
            console.log(q_type)
            //发送查询请求时先检查输入的数据
            if(check(this.type,this.q_word)){
                //验证通过
                //发送请求，参数1：中-英/英-中 参数2：精准/模糊 参数3：查询值
                this.$http.post('php/query_word.php',{type : this.type,q_type:q_type,word : this.q_word},
                {emulateJSON:true}).then(function(res){
                    if(typeof res.body=="string"){
                        this.$message({
                            message: '可惜，词库里没有这个词(　o=^•ェ•)o　┏━┓',
                            type: 'warning'
                          });
                    }else{
                        if(q_type==1){
                            this.words=res.body;
                            this.queried=1; 
                        }
                        else{
                           this.words=dealWords(res.body);
                           this.queried="2";
                           //console.log(this.words);
                        } 
                    }          
                },function(){
                    console.log('请求失败处理');
                });
            }else{
                //验证不通过，阻止
                this.$message.error('输入的词出现了问题呢(●ˇ∀ˇ●)');
            }
            
        },
        inputGlossary:function(word){
            //console.log("word",word)
            //发送post请求
            //注：使用get方法时后端获取不到
            this.$http.post('php/input_glossary.php',{username:this.user.name , word: word},
            {emulateJSON:true}).then(function(res){
                //console.log(this.user.name,word)
                /**/
                if(res.body=="1"){
                    this.$notify({
                        title: '加入生词本',
                        message: '加入成功^_~',
                        type: 'success'
                    });
                }else if(res.body=="0"){
                    this.$notify.error({
                        title: '加入生词本',
                        message: '加入失败，请重试(+_+)?'
                      });
                } else{
                    this.$notify.error({
                        title: '加入生词本',
                        message: '生词已存在哦'
                      });
                }
                //console.log(res.body) 
            },function(){
                this.$notify.error({
                    title: '错误',
                    message: '未知错误'
                  });
            });
        },
        checkWord:function(){
            //alert(this.q_word);
            check(this.q_type,this.q_word);
            
        },
        goVocabulary:function(){
            window.location.href="vocabulary.html";
        },
        goUser:function(){
            window.location.href="user.html";
        },
        logOut:function(){
            //清空session数据
            sessionStorage.clear();
            // sessionStorage.setItem("name","");
            // sessionStorage.setItem("password","");
            //重定向到登录
            window.location.href="index.html";
        },
        getBlue:function(event){
            event.target.style.color='rgb(190, 218, 245)';
            //console.log(event);
        },
        getBlack:function(event){
            event.target.style.color='black';
        }
    },
    created: function () {
        //创建时钩子，读取用户信息
        let name=sessionStorage.getItem("name");
        let pwd=sessionStorage.getItem("password");
        if(name==null){
            window.location.href="index.html";
        }else{
            this.user.name=name;
            this.user.pwd=pwd;
        }
    }
})
function check(type,word){
    if(type==1){
        //type=1时英译中，检验输入的单词（全为字母组成）
        var reg=/^[a-zA-Z]{1,}$/;
    }else{
        //type=2时英译中，检验输入的词（全为汉字组成）
        var reg=/^[\u4E00-\u9FA5]{1,}$/;
    }
    //正则表达式匹配
    let re=reg.test(word);
    //返回结果（boolean）
    return re
}
//定义一个解析后端返回的数组
//目的是为了在把模糊查询的数据按照单词分类
function dealWords(words){
    var b={};
	var New=new Array();
	words.forEach(v=>{
		!b[v.word]?(b[v.word]=[v]):b[v.word].push(v);
	})
	var i=0;
	for(var o in b){
		New[i]={
			"word":o,
			"attr":b[o]
		}
		i++;
    }
    return New;
}
