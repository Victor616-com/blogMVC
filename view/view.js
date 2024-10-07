export default class View {
    constructor() {
        //get the container for displaying posts
        this.postsContainer = document.getElementById('posts');
        this.titleInput = document.getElementById('new-post-title'); //get the post title
        this.contentInput = document.getElementById('new-post-content'); //get the post content
        this.addButton = document.getElementById('add-post'); //get the add button
        this.editor = document.getElementById('editor');
        this.editorTitleInput = document.getElementById('edit-post-title');
        this.editorContentInput = document.getElementById('edit-post-content');
        this.saveEditButton = document.getElementById('save-post');
        this.currentEditIndex = null;
    }

    //Method to get the blog title and the content from the input field
    getPostInput() {
        return {
            title: this.titleInput.value,
            content: this.contentInput.value
        };
    }

    //Method that shows all blockposts to user
    renderPosts(posts, index) {
        this.postsContainer.innerHTML = ""; //clear block list
        posts.forEach(post => {
            const postElement = `
            <div class="post">
                <h2>${post.title}</h2>
                <p>${post.content}<p>
                <button class="delete-btn" data-index="${index}">Delete</button>
                <button class="edit-btn" data-index="${index}">Edit</button>
            </div>
            `;
            this.postsContainer.innerHTML += postElement;
        })

        this.postsContainer.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                
                this.deletePostHandler(index);
            });
        });

        this.postsContainer.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                this.editPostHandler(index);
            });
        });
    }




    bindDeletePost(handler) {
        this.deletePostHandler = handler;
    }

    //Method to bind the add button to a handler function
    //handler = controller method handleaddpost
    bindAddPost(handler) {
        this.addButton.addEventListener('click', () => {
            const post = this.getPostInput();
            if (post.title !=="" && post.content !=="") {
                handler(post);
                this.clearInput();
            }
        })
    }

    bindEditPost(handler) {
        this.editPostHandler = handler;
    }

    // Bind save edit button
    bindSaveEdit(handler) {
        this.saveEditButton.addEventListener('click', () => {
            const updatedPost = {
                title: this.editorTitleInput.value,
                content: this.editorContentInput.value
            };
            handler(this.currentEditIndex, updatedPost); // Pass the index and updated data
            this.hideEditor(); // Hide editor after saving
        });
    }

    populateEditor(title, content, index) {
        this.editor.style.display = 'block'; // Show the editor
        this.editorTitleInput.value = title; // Set the title in the editor
        this.editorContentInput.value = content; // Set the content in the editor
        this.currentEditIndex = index; // Track the index of the post being edited
    }

    hideEditor() {
        this.editor.style.display = 'none';
        this.editorTitleInput.value = '';
        this.editorContentInput.value = '';
    }
    
    //Method to clear the input fields
    clearInput() {
        this.titleInput.value = ''; //clear title input field
        this.contentInput.value = ''; //clear content input field
    }
}