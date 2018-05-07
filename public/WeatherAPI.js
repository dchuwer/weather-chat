import { City } from './City.js'

class WeatherAPI{

    constructor(){}
    

    // getWeather(cityName){
    //    return $.get('http://api.apixu.com/v1/current.json?key=829b2ee50c3d4705a58122238180205&q='+cityName)
    //     .then((data)=>{
                   
    //        var city = data.location.name;
    //        var temp_c = data.current.temp_c;
    //        var temp_f = data.current.temp_f;
    //        var weather = data.current.condition.text;
    //        var last_updated = data.current.last_updated;
    //        var icon = data.current.condition.icon;
    //        return new City(city, temp_c, temp_f, weather, last_updated,icon);                //WeathterOBJ();
    //     })
    // }

    getWeather(citySearch){
        return $.get('http://api.apixu.com/v1/current.json?key=829b2ee50c3d4705a58122238180205&q='+ citySearch)
                
          .then(data => {
           var city = data.location.name;
           var temp_c = data.current.temp_c;
           var temp_f = data.current.temp_f;
           var weather = data.current.condition.text;
           var last_updated = data.current.last_updated;
           var icon = data.current.condition.icon;
           return new City(city, temp_c, temp_f, weather, last_updated,icon)
            
          })
          .catch(err=> {
            console.error(err)
          })
        }   
        
    


}

export { WeatherAPI}