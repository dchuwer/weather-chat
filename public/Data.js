/* Class to Manipulate All Datas */

class Data {
    constructor(city, temp, id, weather, comment ){

        this.city = city;
        this.temp = temp;
        this.id = id;
        this.weather = weather;
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

    getWeather(control){
        
        return $.ajax({
            method: "GET",
            url: 'http://api.apixu.com/v1/current.json?key=829b2ee50c3d4705a58122238180205&q='+this.city})
     
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