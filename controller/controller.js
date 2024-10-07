export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Bind the add post method to the views add button
        this.view.bindAddPost(this.handleAddpost.bind(this));

        //Calls the method that shows existing blogposts to the user on UI
        this.updateView(); 

        this.view.bindDeletePost(this.handleDeletePost.bind(this));
        this.view.bindEditPost(this.handleEditPost.bind(this));
        this.view.bindSaveEdit(this.handleSaveEditPost.bind(this));
    }

    //Method to update the view with the current lists of posts
    updateView() {
        const blogPosts = this.model.getPosts();
        this.view.renderPosts(blogPosts);
    }

    handleDeletePost(index) {
        this.model.deletePost(index);
        this.updateView();
    }

    handleEditPost(index) {
        const post = this.model.getPost(index); // Get the post from the model
        
        // Ensure post is not undefined or null before trying to access its properties
        if (post) {
            this.view.populateEditor(post.title, post.content, index); // Populate the editor with post data
        } else {
            console.error("Post not found at index", index);
        }
    }
    
    handleSaveEditPost(index, updatedPost) {
        this.model.updatePost(index, updatedPost); // Update the post in the model
        this.updateView(); // Re-render the posts
    }
    //Method for adding a new blogpost
    handleAddpost(post) {
        this.model.addPost(post.title, post.content);
        this.updateView();
    }
}