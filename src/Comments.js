import SingleComment from './SingleComment'
import { useState, useEffect } from 'react'
import { commentCreate, commentsLoad } from './redux/actions'
import uniqid from 'uniqid'
import { useDispatch, useSelector } from 'react-redux'

function Comments(props) {
  useEffect(() => {
    dispatch(commentsLoad())
  }, [])

  const [textComment, setTextComment] = useState('')
  
  const comments = useSelector(state => {
    const { commentsReducer } = state
    
    return commentsReducer.comments
  })

  const handleInput = (e) => {
    setTextComment(e.target.value)
  }

  console.log(comments)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = uniqid()
    dispatch(commentCreate(textComment, id))
  }

  return (
    <div className="card-comments">
      <form 
        className="comments-item-create"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={textComment}
          onChange={handleInput}
        />
        <input type="submit" hidden />
      </form>
      {!!comments.length && comments.map(res => {
        return (
          <SingleComment 
            key={res.id}
            data={res}
          />
        )
      })}
    </div>
  )
}

export default Comments
