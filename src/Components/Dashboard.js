import React, { Component } from 'react'
import PostContainer from './PostContainer'
import {connect} from 'react-redux'
import {getUser} from '../ducks/reducer'
import axios from 'axios'

//TODO Write all methods, connect to store, connect methods to jsx.
class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      userInput: '',
    }
  }

  componentDidMount() {
    this.props.getUser().then(()=> {
      axios.get('/api/posts').then(res=>{
        this.setState({
          posts: res.data
        })
      })
    }).catch(()=>{
      this.props.history.push('/')
    })
  }

  handleChange = (e) => {
    this.setState({
      userInput: e.target.value
    })
  }

  handleClick = () => {
    const body = {
      users_id: this.props.user.users_id,
      content: this.state.userInput
    }
    if(body.content){
      axios.post('/api/posts', body).then(res => {
        this.setState({
          posts:res.data,
          userInput:''
        })
      })
    }
  }

  handleEdit = (post_id, connect) => {
    axios.put(`/api/posts/${post_id}`, {connect}).then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  handleDelete = (post_id) => {
    axios.delete(`/api/posts/${post_id}`).then(res=>{
      this.setState({
        posts: res.data
      })
    })
  }

  render() {
    const mappedPosts = this.state.posts.map((post, index) => {
      return (
        <PostContainer
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          key={post.post_id} data={post}
        />
      )
    })
    return (
      <>
        <div className="input-container">
          <textarea
            id="new-post"
            cols="60"
            rows="2"
            placeholder="New post..."
            value={this.state.userInput
            }
            onChange={(e) => {
              this.handleChange(e)
            }}
          />
          <button
            onClick={() => {
              this.handleClick()
            }}
            className="input-container-button"
          >
            Post
          </button>
        </div>

        <section className="app-body">
          <div className="padding" />
          <ul className="flex-vertical-center post-feed">{mappedPosts}</ul>
        </section>
      </>
    )
  }
}
const mapStateToUser = reduxState => reduxState
export default connect(mapStateToUser, {getUser})(Dashboard)
