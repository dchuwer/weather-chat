/* Class to Manipulate All Renders */

class View{

    constructor(){}

    render(post){
            $('.dropdown').css({display: "block"});
            var source = $('#searchResult').html();
            var template = Handlebars.compile(source);
            var newHTML = template(post);
            $('.posts').append(newHTML);
        
    }

    renderComments(posts){
        $('.posts').empty();
        if (posts.length > 0)
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