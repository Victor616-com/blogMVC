export default class Model {
    #posts
    constructor(postFromStorage) {
        this.#posts = postFromStorage; // create empty array for blogposts
    }

    //Method that adds a new blogpost to the array
    addPost(title, content) {
        this.#posts.push({title, content}); //Add new blogpost to the end of the array
        localStorage.setItem('posts', JSON.stringify(this.#posts));
    }


    //Method to get the current list of blogposts
    getPosts() {
        return this.#posts;
    }

    deletePost(index) {
        this.#posts.splice(index, 1); // Remove one post at the given index
        localStorage.setItem('posts', JSON.stringify(this.#posts));
    }

    getPost(index) {
        return this.#posts[index];
    }
    
    updatePost(index, updatedPost) {
        if (index >= 0 && index < this.#posts.length) {
            this.#posts[index] = updatedPost;
            localStorage.setItem('posts', JSON.stringify(this.#posts));
        } else {
            throw new Error('Index out of bounds');
        }
    }
}