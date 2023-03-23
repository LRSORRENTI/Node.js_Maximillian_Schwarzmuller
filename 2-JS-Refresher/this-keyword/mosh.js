// method => obj 
// obj => (window, global)

const video = {
    title: 'a', 
    tags: ['a','b','c'],
    showTags(){
        this.tags.forEach(function(tag){
            console.log(this.title, tag)
        }, this)
    }
}

function Video(title){
    this.title = title
    console.log(this)
}

const v = new  Video('amadeus')

video.showTags()