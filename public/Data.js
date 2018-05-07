/* Class to Manipulate All Datas */

class Data {
    constructor(){
        this.arrPosts = this.getFromLocalStorage();
    }


    saveToLocalStorage(arrayResults){

        localStorage.setItem('Weather-Chat', JSON.stringify(arrayResults));
    }

    getFromLocalStorage(){
        
            return JSON.parse(localStorage.getItem('Weather-Chat') || '[]');
        

    }

    createPost(newpost){
             
            this.arrPosts.push(newpost)
            this.saveToLocalStorage(this.arrPosts);
    }

    addComment(inputComment,id){
            
            var index = this.findPostById(this.arrPosts,id);
            var comment1 = this.arrPosts[index]
            var newObjComm = {text : inputComment};
            comment1.comment.push(newObjComm)
            this.saveToLocalStorage(this.arrPosts);
    }

    delPost(id){

        let index = this.findPostById(this.arrPosts,id)
        this.arrPosts.splice(index,1);
        this.saveToLocalStorage(this.arrPosts);
        
    }

    findPostById(posts, id){
        
        for (let i =0; i < posts.length ; i++){
           if (posts[i].id == id)
           return i
        }
    }

    sortPosts(typeSort){

            var self=this.arrPosts;
            self.asc=!self.asc;
            return this.arrPosts.sort(function (l, r) {
                return l[typeSort] > r[typeSort] ? (self.asc ? 1 : -1) : l[typeSort] < r[typeSort] ? (self.asc ? -1 : 1) : 0;
            });


    }
  
}

export { Data };