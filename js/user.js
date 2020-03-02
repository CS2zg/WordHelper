new Vue({
    el:"#body",
    data:{
        user:{
            name:"",
            pwd:""
        },
        words:[]
    },
    methods:{
        deleteWord:function(w){
            //获取下标
            let index=this.words.indexOf(w)//console.log()
            //先删除数据库中的记录
            this.$http.post('php/delete_glossary.php',{username : this.user.name , word: w.word},
            {emulateJSON:true}).then(function(res){
                if(res.body>=1){
                    this.$notify({
                        title: '成功',
                        message: '移除成功',
                        type: 'success'
                      });
                      //数据库数据删除成功后删除列表中的值
                      this.words.splice(index, 1);
                }else{
                    this.$notify({
                        title: '错误',
                        message: '移除失败，请重试(●ˇ∀ˇ●)',
                        type: 'warning'
                      });;
                    
                }
                
                //console.log(res.body)
            },function(){
                console.log('请求失败处理');
            });
        },
        modifyPwd:function(){
            let that=this;
            //修改密码
            this.$prompt('请输入原密码', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputType:"password",
                inputPattern: /^[0-9a-zA-Z]{6,}$/,
                inputErrorMessage: '密码格式不正确'
              }).then(({ value }) => {
                  //老密码正确
                if(value==that.user.pwd){
                    this.$prompt('请输入新密码', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputType:"password",
                        inputPattern: /^[0-9a-zA-Z]{6,}$/,
                        inputErrorMessage: '密码格式不正确'
                    }).then(({ value }) => {
                        //向后端发送post请求
                        this.$http.post('php/update_user.php',{username : this.user.name,pwd:value},
                        {emulateJSON:true}).then(function(res){
                            if(res.body==1){
                                this.$message({
                                    type: 'info',
                                    message: '修改成功'
                                    });   
                            }else{
                                this.$message({
                                type: 'info',
                                message: res.body//'修改失败'
                                });       
                            }
                            console.log(this.user.name,value)
                        },function(){
                            console.log('请求失败处理');
                        });
                    }).catch(() => {
                        this.$message({
                        type: 'info',
                        message: '取消输入'
                        });       
                    });
                }else{
                    this.$message({
                        type: 'info',
                        message: '原密码错误'
                      });   
                }
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消输入'
                });       
              });
            
        },
        logOut:function(){
            //清空session数据
            sessionStorage.clear();
            //重定向到登录
            window.location.href="index.html";
        }
    },
    created:function(){
        //创建钩子，初始化用户
        
        this.user.name=sessionStorage.getItem("name");
        let pwd=sessionStorage.getItem("password");
        this.user.pwd=pwd;
        //获得生词表
        this.$http.post('php/query_glossary.php',{username : this.user.name},
        {emulateJSON:true}).then(function(res){
            if(typeof res.body=="string"){
                this.$message({
                    message: '空空如也(　o=^•ェ•)o　┏━┓',
                    type: 'warning'
                    });
            }else{
                this.words=dealWords(res.body);//处理返回结果
                
            }
            //console.log(res.body)
        },function(){
            console.log('请求失败处理');
        });
    }
})
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
//获取日期时间
function startTime(){
    let today=new Date();
    let h=today.getHours();//时
    let m=today.getMinutes();//分
    let s=today.getSeconds();//秒
    let date=today.getDay();//日
    let mon=today.getMonth()+1;//月
    m=checkTime(m);
    s=checkTime(s);
    document.getElementById("date").innerHTML=mon+'月'+date+'日';
    document.getElementById("time").innerHTML=h+':'+m+':'+s;
    var greet=document.getElementById("greet");
    if(h>=10&&h<14){
        greet.innerHTML="Hello,中午好";
    }else if(h>=5&&h<10){
        greet.innerHTML="Hello,早上好";
    }else if(h>=14&&h<19){
        greet.innerHTML="Hello,下午好";
    }else{
        greet.innerHTML="Hello,晚上好";
    }
    t=setTimeout("startTime()",1000);
  }

function checkTime(i){
if(i<10){
    i='0'+i;
}
return i;
}