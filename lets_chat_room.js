
//ADD YOUR FIREBASE LINKS
var firebaseConfig = { 
  apiKey: "AIzaSyDObctvJ50YvSGpx6oaOTekmMVtUT-NAW4", 
  authDomain: "kwitter-de2e9.firebaseapp.com", 
  databaseURL: "https://kwitter-de2e9-default-rtdb.firebaseio.com",
   projectId: "kwitter-de2e9",
    storageBucket: "kwitter-de2e9.appspot.com", 
   messagingSenderId: "785114759452", 
   appId: "1:785114759452:web:0a12f885f27b7cbd0e3ad9"
  
   
  };
    // Initialize Firebase 
     firebase.initializeApp(firebaseConfig);

  function addUser(){
    user_name=document.getElementById("user_name").value;
   // localStorage.setItem("user_name", user_name);
    window.location="lets_chat_room.html"
}
     
  
     user_name = localStorage.getItem("user_name");
     console.log(user_name);

  
  document.getElementById("user_name1").innerHTML = "Welcome " + user_name + "!";
  
  function addRoom()
  {
    room_name = document.getElementById("room_name").value;
  
    firebase.database().ref("/").child(room_name).update({
      purpose : "adding room name"
    });
  
      localStorage.setItem("room_name", room_name);
      
      window.location = "lets_chat_page.html";
  }
  
  function getData() 
  {
      firebase.database().ref("/").on('value', 
        function(snapshot)
        {
         document.getElementById("output").innerHTML = "";
         snapshot.forEach(function(childSnapshot) 
         { 
         
          childKey  = childSnapshot.key;
         Room_names = childSnapshot.key;
         firebase_msg_id=childSnapshot.key;
         msg_data=childSnapshot.val();
         if (childKey !="purpose"){
         console.log(msg_data);
         name1=msg_data['name'];
         console.log(name1);
         msg=msg_data['msg'];
         console.log(msg);
         name_with_tag = "<h4> "+ name1 +"<img class='user_tick' src='tick.png'></h4>"; 
         message_with_tag = "<h4 class='message_h4'>" + msg + "</h4>";
         like_button ="<button class='btn btn-warning' id="+firebase_msg_id+" onclick='updateLike(this.id)'>";
         span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> </span></button><hr>";
         row = name_with_tag + message_with_tag +like_button + span_with_tag;
         document.getElementById("output").innerHTML += row;
        }

 /*        console.log("Room Name - " + Room_names);
        row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
        document.getElementById("output").innerHTML += row; */
      });
    });
  
  }
  
  getData();
  
  function redirectToRoomName(name)
  {
    console.log(name);
    localStorage.setItem("room_name", name);
      window.location = "lets_chat_page.html";
  }
  
  function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
      window.location = "index.html";
  }
  room_name=localStorage.getItem("room_name");
  console.log(room_name);
  

  function send(){
    msg=document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
      name:user_name,
      msg:msg,
      like:0
    })
  }

  function updateLike(msg_id)
  {
    button_id=msg_id;
    updated_likes=Number(likes)+1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(msg_id).update({
      like:updated_likes
    });


  }


