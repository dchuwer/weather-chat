/** Import Classes to manipulate Data and View */

import {Data} from './Data.js'
import {View} from './View.js'
import { WeatherAPI } from './WeatherAPI.js'
import { City } from './City.js';


/* Declaration Class Controller */
class Controller {
    constructor(){

        this.data = new Data();
        this.view = new View();
        this.WeatherAPI = new WeatherAPI();
        this.city = new City(); // No need to create acity here

    }

    initApplication(){

        /** Update the weather from the posts*/
         if(this.data.arrPosts.length > 0)
           var arrCities = this.data.arrPosts.map( a => a.city);
           checkWeather(arrCities)
            async function checkWeather(arrCities) {
                var newarr =  arrCities.map( x => (controller.WeatherAPI.getWeather(x)))
                var nArr = await Promise.all(newarr)
                controller.data.updateWeather(nArr);
            }
            this.view.renderComments(this.data.arrPosts);

        /* Start a new City Post **/
        $('.searchButton').on('click', function(){  
            
            var city = $('#inputCity').val();  
            $('#inputCity').val('')
            /* Search API using AJAX **/
            var ajaxCall  = controller.WeatherAPI.getWeather(city);

            ajaxCall.then(function (weatherObj) {
                controller.data.createPost(weatherObj);
                controller.view.render(weatherObj);
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
            controller.data.addComment(inputComment,id)
            controller.view.renderComments(controller.data.arrPosts);
        
        
            
        })
    
        /* Delete a Post */
        $('.results').on('click','.trash', function(){
            var id = $(this).closest('.result').data().id        
            var delpost = controller.data.delPost(id);
            controller.view.renderComments(controller.data.arrPosts);
       
        });

        /* Sort By City */
        $('.container').on('click','#cityButton', function(){
            controller.data.sortPosts("city");
            controller.view.renderComments(controller.data.arrPosts);
       
        });

        /* Sort By Temperature */
        $('.container').on('click','#tempButton', function(){
            controller.data.sortPosts("temp_c");
            controller.view.renderComments(controller.data.arrPosts);
       
        });
    
        /* Sort By Date */
        $('.container').on('click','#tempButton', function(){
            controller.data.sortPosts("last_updated");
            controller.view.renderComments(controller.data.arrPosts);
       
        });
        

    }
}




    var controller = new Controller();
    
    // $("input").keypress(function(event) {
    //     if (event.keyCode === 13) {
    //         $(".buttonSearch").click();
    //     }
    // });
    controller.initApplication();


