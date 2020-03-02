new Vue({
    el:'#body',
    data:{
      login:true,
      userForm:{
        name:"",
        pwd:"",
        checkcode:""
      },
      suserForm:{
        name:"",
        pwd:"",
        repwd:""
      }
    },
    methods:{
      refreshCode:function(){
        window.location.href='index.html';
      },
      goSignup:function(){
        this.login=false;
      },
      goLogin:function(){
        this.login=true;
      },
      submitForm(formName) {
        //提交登录表单
        if(formName=="userForm"){
          var msg=checkForm(this.userForm.name,this.userForm.pwd,this.userForm.checkcode);
          console.log(msg);
          if(msg!="ok"){
            this.$notify.error({
              title: '错误',
              message: msg
            });
          }else{
            this.$http.post('php/login.php',{user : this.userForm},
            {emulateJSON:true}).then(function(res){
              if(res.body=="0") this.$message({message: '验证码错误',type: 'error'});
              else if(res.body=="-1")  this.$message({message: '用户民或密码错误',type: 'error'});
              else if(res.body=="1"){
                this.$message({message: '登录成功',type: 'success'});
                //把登录用户信息保存在session中
                sessionStorage.setItem("name",this.userForm.name);
                sessionStorage.setItem("password",this.userForm.pwd);
                //跳转
                window.location.href="query_word.html";

              }else this.$message({message: '未知错误',type: 'error'});   
            },function(){
              this.$message({
                message: '添加失败，请重试',
                type: 'error'});
            });
          }
        }else{
          //提交注册表单
          var msg=checkSForm(this.suserForm.name,this.suserForm.pwd,this.suserForm.repwd);
          if(msg!="ok"){
            this.$notify.error({
              title: '错误',
              message: msg
            });
          }else{
            this.$http.post('php/signup.php',{user : this.suserForm},
            {emulateJSON:true}).then(function(res){
              if(res.body=="0") this.$message({message: '用户名已存在',type: 'error'});
              else if(res.body=="1"){
                this.$message({message: '注册成功',type: 'success'});
                //回到登录
                this.login=true;

              }else this.$message({message: '未知错误',type: 'error'});   
            },function(){
              this.$message({
                message: '注册失败，请重试',
                type: 'error'});
            });
          }
        }
        
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
      
    }
  });
  function checkForm(name,pwd,checkcode){
    var msg="ok";
    if(name==""||pwd==""||checkcode==""){
      msg= "信息没填完哦";
    }else{
      if(name.length<2){
        msg="用户名不能小于2";
      }
      if(pwd.length<6||pwd.length>20){
        msg="密码长度应为6~20";
      }
    }
    return msg;
  }
  function checkSForm(name,pwd,repwd){
    var msg="ok";
    if(name==""||pwd==""||repwd==""){
      msg= "登录信息没填完哦";
    }else{
      if(name.length<2){
        msg="用户名不能小于2";
      }
      if(pwd.length<6||pwd.length>20){
        msg="密码长度应为6~20";
      }
      if(pwd!=repwd){
        msg="两次密码不一致";
      }
    }
    return msg;
  }
