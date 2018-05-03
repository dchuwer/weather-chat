/** Import Classes to manipulate Data and View */

import {Data} from './Data.js'
import {View} from './View.js'

/* Declaration Class Controller */
class Controller {
    constructor(){

        this.data = new Data();
        this.view = new View();


    }

    initApplication(){

        /* Start a new City Post **/
        $('.searchButton').on('click', function(){    
            var post = new Controller();     
            console.log(post)   
            post.data.city = $('#inputCity').val();  
            
            /* Search API using AJAX **/
            var ajaxCall  = post.data.getWeather(post);
            ajaxCall.then(function(data) {
                  
                
                var id= Date.now();
                post.data.city = data.location.name;
                post.data.temp = data.current.temp_c;
                post.data.weather = data.current.condition.text;
                post.data.id = id;
                var arrPosts = post.data.getFromLocalStorage();
                arrPosts.push(post.data)
                post.data.saveToLocalStorage(arrPosts);
                post.view.render(post.data);
            });

            // ajaxCall.error(function(jqXHR, textStatus, errorThrown) {
            //     console.log(textStatus);
            // });

           
        })

        /* Start a New Comment */
        $('.results').on('click','.commentButton', function(){
    
            var post = new Controller(); 
            var inputComment = $(this).parent().find('#inputComment').val();
            var id = $(this).closest('.result').data().id
            var posts = post.data.getFromLocalStorage();
            var index = post.data.findPostById(posts,id);
            
            var comment1 = posts[index]
            var newObjComm = {text : inputComment};
            console.log(posts)
            comment1.comment.push(newObjComm)
           
            
            post.data.saveToLocalStorage(posts);
    
            post.view.renderComments(posts);
        
        
            
        })
    
        /* Delete a Post */
        $('.results').on('click','.trash', function(){
            var post = new Controller;
            var id = $(this).closest('.result').data().id
            var resmem = post.data.getFromLocalStorage();
            let index = post.data.findPostById(resmem,id)
            resmem.splice(index,1);
            post.data.saveToLocalStorage(resmem);
            post.view.renderComments(resmem);
       
        });
    

    }
}




    var controller = new Controller();
    controller.initApplication();


