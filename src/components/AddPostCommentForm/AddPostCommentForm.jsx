import React, { useState, useRef } from "react";
import cn from "classnames";
import dynamicHeight from "./dynamicHeight";
import "./AddPostCommentForm.css";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";

const INITIAL_HEIGHT = 46;

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/how-to-build-an-expandable-comment-box
 */
export default function CommentBox( post, isProfile, user, props ) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [state, setState] = useState({
    caption: ''
  })

  const outerHeight = useRef(INITIAL_HEIGHT);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  dynamicHeight(textRef, commentValue);

  const onExpand = () => {
    if (!isExpanded) {
      outerHeight.current = containerRef.current.scrollHeight;
      setIsExpanded(true);
    }
  };

  const onChange = (e) => {
    setCommentValue(e.target.value);
  };

  const onClose = () => {
    setCommentValue("");
    setIsExpanded(false);
  };

//   function handleChange(e){
//     setState({
//       ...state,
//       [e.target.name]: e.target.value
//     })
//   }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("send the form data somewhere");
    const formData = new FormData()
    formData.append('caption', state.caption)
    props.handleAddPostComment({comment: state.comment}); 
  };

  return (
    <div className="container">
      <form
        onSubmit={onSubmit}
        ref={containerRef}
        className={cn("comment-box", {
          expanded: isExpanded,
          collapsed: !isExpanded,
          modified: commentValue.length > 0
        })}
        style={{
          minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT
        }}
      >
        <div className="header">
          <div className="user">
            <Link to={`/${user?.username}`}>
                <Image key={post._id} src={`${post.photoUrl}`} wrapped ui={false} />
            </Link>
            <span>User Name</span>
          </div>
        </div>
        <label htmlFor="comment">What are your thoughts?</label>
        <textarea
          ref={textRef}
          onClick={onExpand}
          onFocus={onExpand}
          onChange={onChange}
          className="comment-field"
          placeholder="What are your thoughts?"
          value={commentValue}
          name="comment"
          id="comment"
        />
        <div className="actions">
          <button type="button" className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" disabled={commentValue.length < 1} >
            Respond
          </button>
        </div>
      </form>
    </div>
  );
}
