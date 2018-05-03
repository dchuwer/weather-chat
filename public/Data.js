/* Class to Manipulate All Datas */

class Data {
    constructor(city, temp, id, weather, comment ){

        this.city = city;
        this.temp = temp;
        this.id = id;
        this.weather = weather;
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

    findPostById(posts, id){
        
        for (let i =0; i < posts.length ; i++){
           if (posts[i].id == id)
           return i
        }
    }
  
}

export { Data };