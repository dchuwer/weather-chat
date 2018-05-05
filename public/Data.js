/* Class to Manipulate All Datas */

class Data {
    constructor(city, temp_c, temp_f, id, weather, last_updated, icon, comment ){

        this.city = city;
        this.temp_c = temp_c;
        this.temp_f = temp_f;
        this.id = id;
        this.weather = weather;
        this.last_updated = last_updated;
        this.icon = icon;
        this.asc = false;
        this.comment = [];
        //this.arrPosts = this.getFromLocalStorage();

    }


    saveToLocalStorage(arrayResults){

        localStorage.setItem('Weather-Chat', JSON.stringify(arrayResults));
    }

    getFromLocalStorage(){
        
            return JSON.parse(localStorage.getItem('Weather-Chat') || '[]');
        

    }

    getWeather(){
        
        return $.ajax({
            method: "GET",
            url: 'http://api.apixu.com/v1/current.json?key=829b2ee50c3d4705a58122238180205&q='+this.city})
     
    }

    createPost(data){
             
            console.log(this);
            var id= Date.now();
            this.city = data.location.name;
            this.temp_c = data.current.temp_c;
            this.temp_f = data.current.temp_f;
            this.weather = data.current.condition.text;
            this.id = id;
            this.last_updated = data.current.last_updated;
            this.icon = data.current.condition.icon;
            var arrPosts = this.getFromLocalStorage();
            arrPosts.push(this)
            this.saveToLocalStorage(arrPosts);
            
       
    }

    addComment(inputComment,id){
            var posts = this.getFromLocalStorage();
            var index = this.findPostById(posts,id);
            
            var comment1 = posts[index]
            var newObjComm = {text : inputComment};
            comment1.comment.push(newObjComm)
            this.saveToLocalStorage(posts);
            return posts;

    }

    delPost(id){

        var resmem = this.getFromLocalStorage();
        let index = this.findPostById(resmem,id)
        resmem.splice(index,1);
        this.saveToLocalStorage(resmem);
        return resmem;
    }

    findPostById(posts, id){
        
        for (let i =0; i < posts.length ; i++){
           if (posts[i].id == id)
           return i
        }
    }

    sortPosts(posts,typeSort){


            var self=posts;
            self.asc=!self.asc;
            return posts.sort(function (l, r) {
                return l[typeSort] > r[typeSort] ? (self.asc ? 1 : -1) : l[typeSort] < r[typeSort] ? (self.asc ? -1 : 1) : 0;
            });


    }
  
}

export { Data };