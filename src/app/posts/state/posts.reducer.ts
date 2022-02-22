import { createReducer, on } from "@ngrx/store";
import { addPostSuccess, deletePost, deletePostSuccess, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.actions";
import { initialState, PostsState } from "./posts.state";

const _postsReducer = createReducer(
    initialState,
    on(addPostSuccess, (state, action) =>{
        let post = {...action.post};
        
        // post.id = (state.posts.length + 1).toString();
        return{
            ...state,
            posts:[...state.posts, post],
        };
    }),
    on(updatePostSuccess, (state, action) => {
        const updatePosts =  state.posts.map((post) => {
            return action.post.id === post.id ? action.post : post;
        });
        return {
            ...state,
            posts:updatePosts,
        };
    }),
    on(deletePostSuccess, (state, {id}) =>{
        const updatePosts = state.posts.filter(post =>{
            return post.id !==id;
        });
        
        return {
            ...state,
            posts: updatePosts,
        };
    }),
    on(loadPostsSuccess, (state, action) =>{
        return {
            ...state,
            posts:action.posts,
        }
    })
    
);

export function postsReducer(state: any, action: any){
 return _postsReducer(state, action); 
}