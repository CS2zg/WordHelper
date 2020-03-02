var user=sessionStorage.getItem("name");
console.log(user);
if(user==null){
    window.location.href="index.html";
}