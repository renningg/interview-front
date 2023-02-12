<script>

//promise版本的ajax，promise封装ajax
function pajax(options){
  var q = new Promise(function(resolve,reject){
    ajax({
      ...options,
      success:function(res){
        resolve(res)
 
      },error:function(err){
        reject(err)
 
      }
    })
 
  })
  return q
}
</script>