import { 
    ADD_COMMENT, 
    SET_POSTS,
    CREATING_POST,
    POSTS_CREATED
} from "../actions/actionTypes"

export const initialState = {
    posts: [
        // {
        //     id: Math.random(),
        //     nickname: 'Louis Rouseu',
        //     email: 'louis.french@gmail.com',
        //     image: image1,
        //     comments: [
        //         {
        //             nickname: 'Mary Harrier',
        //             comment: 'Very Nice!!!'
        //         },
        //         {
        //             nickname: 'Amy Beau',
        //             comment: 'Awesome!'
        //         },
        //         {
        //             nickname: 'Joey Montana',
        //             comment: 'Is this real?'
        //         }
        //     ]
        // },
        // {
        //     id: Math.random(),
        //     nickname: 'James Richards',
        //     email: 'james.rich@gmail.com',
        //     image: image2,
        //     comments: [
        //         {
        //             nickname: 'Carlos Saldaña',
        //             comment: 'Pretty crazy'
        //         }
        //     ]
        // }
    ],
    isUploading: false
}
export default (state = initialState, action) => {
    if (!action)
        return initialState

    switch(action.type){       
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case ADD_COMMENT:
            return {
                ...state,
                posts: state.posts.map(x => {
                    if (x.id === action.payload.postId){
                        if(x.comments){
                            x.comments = x.comments.concat(
                                action.payload.comment
                            )
                        }else{
                            x.comments = [action.payload.comment]
                        }
                    }
                    return x
                })
            }
        case CREATING_POST:
            return{
                ...state,
                isUploading: true
            }
        case POSTS_CREATED:
            return {
                ...state,
                isUploading: false
            }
        default:
            return state
    }
}

