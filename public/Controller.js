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
                   
            controller.data.city = $('#inputCity').val();  
            
            /* Search API using AJAX **/
            var ajaxCall  = controller.data.getWeather();
            ajaxCall.then(function(data) {
                  
                
                var id= Date.now();
                controller.data.city = data.location.name;
                controller.data.temp = data.current.temp_c;
                controller.data.weather = data.current.condition.text;
                controller.data.id = id;
                var arrPosts = controller.data.getFromLocalStorage();
                arrPosts.push(controller.data)
                controller.data.saveToLocalStorage(arrPosts);
                controller.view.render(controller.data);
            });

            // ajaxCall.error(function(jqXHR, textStatus, errorThrown) {
            //     console.log(textStatus);
            // });

           
        })

        /* Start a New Comment */
        $('.results').on('click','.commentButton', function(){
    
            
            var inputComment = $(this).parent().find('#inputComment').val();
            var id = $(this).closest('.result').data().id
            var posts = controller.data.getFromLocalStorage();
            var index = controller.data.findPostById(posts,id);
            
            var comment1 = posts[index]
            var newObjComm = {text : inputComment};
            comment1.comment.push(newObjComm)
           
            
            controller.data.saveToLocalStorage(posts);
    
            controller.view.renderComments(posts);
        
        
            
        })
    
        /* Delete a Post */
        $('.results').on('click','.trash', function(){
            var id = $(this).closest('.result').data().id
            var resmem = controller.data.getFromLocalStorage();
            let index = controller.data.findPostById(resmem,id)
            resmem.splice(index,1);
            controller.data.saveToLocalStorage(resmem);
            controller.view.renderComments(resmem);
       
        });
    

    }
}




    var controller = new Controller();
    var arrPosts = controller.data.getFromLocalStorage();
    controller.view.renderComments(arrPosts)
    controller.initApplication();


