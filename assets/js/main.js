document.querySelector('#getData').addEventListener('click', getInfo);

function getInfo(){
  // console.log('test')
  var xhr = new XMLHttpRequest();
  // console.log(xhr);
  // console.log(xhr.readyState); 
  // xhr.onreadystatechange = function(){

  // }
  xhr.onload = function (){
    // console.log(this.status);
    if(this.status == 200){
      console.log(this.responseText);
    }
  }
  xhr.open('GET', 'ajax.txt', true);
  xhr.send();
  // console.log(xhr);

}

