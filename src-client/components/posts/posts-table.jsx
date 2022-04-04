import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import API from '../../api/api';

class PostTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], filter: { id: '', author: '' } };
    this.handleEditPost = this.handleEditPost.bind(this);
    this.handleRemovePost = this.handleRemovePost.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
    this.getByID = this.getByID.bind(this);
    this.handleChange = this.handleChange.bind(this);
    if (process.env.NODE_ENV === 'test') return;
    // Continue initialization for non-test environments
    this.fetchPosts();
  }

  handleEditPost(id) {
    const { sendToEdit } = this.props;
    const { posts } = this.state;
    sendToEdit(posts.find((p) => p.id === id));
  }

  handleRemovePost(id) {
    API.delete(`/api/posts/${id}`)
      .then(() => {
        this.fetchPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(event) {
    if (event.target.id === 'id') {
      const vm = this;
      const targetValue = event.target.value;
      this.setState({ filter: event.target.value }, () => {
        if (targetValue) vm.getByID();
        else vm.fetchPosts();
      });
    } else {
      const vm = this;
      const targetValue = event.target.value;
      this.setState({ filter: event.target.value }, () => {
        if (targetValue) vm.getByAuthor();
        else vm.fetchPosts();
      });
    }
  }

  getByID() {
    const { filter } = this.state;
    console.log(filter);
    API.get(`/api/posts/${filter}`)
      .then((res) => {
        if (res.data) this.setState({ posts: [res.data] });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getByAuthor() {
    const { filter } = this.state;
    console.log(filter);
    API.get(`/api/posts/${filter}`)
      .then((res) => {
        if (res.data) this.setState({ posts: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchPosts() {
    API.get('/api/posts')
      .then((res) => {
        this.setState({ posts: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { posts } = this.state;
    const columns = [
      { field: 'id', width: 50 },
      { field: 'title', width: 200 },
      { field: 'author', width: 300 },
      { field: 'content', width: 400 },
      {
        field: 'actions',
        type: 'actions',
        width: 50,
        getActions: (event) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => this.handleRemovePost(event.id)}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => this.handleEditPost(event.id)}
          />,
        ],
      }
    ];
    return (
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid checkboxSelection columns={columns} rows={posts} />
      </div>
    );
  }
}

PostTable.propTypes = {
  sendToEdit: PropTypes.func.isRequired,
};

export default PostTable;
