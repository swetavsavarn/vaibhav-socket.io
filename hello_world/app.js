var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
   res.sendFile('E:/socket.io/hello_world/index.html');});
// users = [];
// io.on('connection', function(socket){
   
//    socket.on('setUsername', function(data){
//       console.log(data);
//       if(users.indexOf(data) > -1){
//          socket.emit('userExists', data + ' username is taken!');
//       } else {
//          users.push(data);
//          socket.emit('userSet', {username: data});
//       }
//    });
//    socket.on('msg', function(data){
//       //Send message to everyone
//       io.sockets.emit('newmsg', data);
//    })
// });
app.get('/joinroom',(req,res)=>{
   
   res.sendFile('E:/socket.io/hello_world/room.html')
   
    });
    users = [];
    let user_count=0
    io.on("connection", socket => {
      // socket.join("some room");
      user_count++
      io.emit('no',user_count)
     
      socket.on('joinroom',(data)=>{
         // console.log(data)
         if(users.indexOf(data.username) > -1){

            socket.emit('userExists', data.username + ' username is taken!');
         }
         else
         {
            users.push(data.username);
            
          
               socket.join(data.roomname);
               var abc=data.roomname
               socket.emit('userSet', {username: data.username});
               socket.on('msg', function(data1){
                  console.log(abc)
                  // console.log(data1)
                 
                  io.to(abc).emit('newmsg', data1);
               })
             
         }
      

      })
      socket.on('disconnect', function () {
         // console.log("user disco")
         user_count--
         io.emit('no',user_count)
         
      });
      


})
http.listen(3000, function(){
   console.log('listening on localhost:3000');
});