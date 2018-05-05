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
            $('#inputCity').val('')
            /* Search API using AJAX **/
            var ajaxCall  = controller.data.getWeather();

            ajaxCall.then(function (data) {
                controller.data.createPost(data);
                controller.view.render(controller.data);
            })
           
           
            // ajaxCall.error(function(jqXHR, textStatus, errorThrown) {
            //     console.log(textStatus);
            // });

            
           
        })

        /* Start a New Comment */
        $('.results').on('click','.commentButton', function(){
            
            
            var inputComment = $(this).parent().find('#inputComment').val();
            $(this).parent().find('#inputComment').val('')
            var id = $(this).closest('.result').data().id
            var posts = controller.data.addComment(inputComment,id)
            controller.view.renderComments(posts);
        
        
            
        })
    
        /* Delete a Post */
        $('.results').on('click','.trash', function(){
            var id = $(this).closest('.result').data().id        
            var delpost = controller.data.delPost(id);
            controller.view.renderComments(delpost);
       
        });

        /* Sort By City */
        $('.container').on('click','#cityButton', function(){
            var resmem = controller.data.getFromLocalStorage();
            
            controller.data.sortPosts(resmem,"city");
            controller.data.saveToLocalStorage(resmem);
            controller.view.renderComments(resmem);
       
        });

        /* Sort By Temperature */
        $('.container').on('click','#tempButton', function(){
            var resmem = controller.data.getFromLocalStorage();
            
            controller.data.sortPosts(resmem,"temp_c");
            controller.data.saveToLocalStorage(resmem);
            controller.view.renderComments(resmem);
       
        });
    
        /* Sort By Date */
        $('.container').on('click','#tempButton', function(){
            var resmem = controller.data.getFromLocalStorage();
            
            controller.data.sortPosts(resmem,"last_updated");
            controller.data.saveToLocalStorage(resmem);
            controller.view.renderComments(resmem);
       
        });
        

    }
}




    var controller = new Controller();
    var arrPosts = controller.data.getFromLocalStorage();
    controller.view.renderComments(arrPosts)
    
    // $("input").keypress(function(event) {
    //     if (event.keyCode === 13) {
    //         $(".buttonSearch").click();
    //     }
    // });
    controller.initApplication();


