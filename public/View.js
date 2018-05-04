/* Class to Manipulate All Renders */

class View {
    constructor(){


    }


    render(posts){
   
            var source = $('#searchResult').html();
            var template = Handlebars.compile(source);
            var newHTML = template(posts);
            $('.posts').append(newHTML);
        
    }

    renderComments(posts){
        $('.posts').empty();
        $('.dropdown').css({display: "block"});
        for (let i=0; i<posts.length; i++){
    
            var source = $('#searchResult').html();
            var template = Handlebars.compile(source);
            var newHTML = template(posts[i]);
            $('.posts').append(newHTML);
        }
    }

}

export { View };