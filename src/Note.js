import React from 'react';
import marked from 'marked';
import './Note.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      content: '' 
    }
  }

  componentDidMount() {
    this.getLocalStorage();
    this.setContent();
  }

  setContent = () => {
    let content = '# Here\'s another note!\n\nGo ahead and edit to your heart\'s content.'
    if (this.props.index === 0) {
      content = '# Hey there!\n\nThis is your first Markdown note. You can:\n\n* Click/Focus to edit\n\n* Click off/Blur to save\n\n* Add a new note by clicking the plus sign above.\n\n* Delete this note'
    }
    this.setState({ content });
  }

  getLocalStorage = () => {
    const edit = JSON.parse(window.localStorage.getItem('edit'));
    const content = window.localStorage.getItem('content');
    if (edit === 'true') {
      this.setState({ edit, content });
    }
  }

  getMarkdownText = () => {
    let content = this.state.content;
    let markup = marked(content);
    return { __html: markup };
  }

  selectText = (e) => {
    e.target.select();
  }

  toggleEdit = () => {
    let edit = !this.state.edit;
    this.setState({ edit });
  }

  editNote = (e) => {
    const content = e.target.value;
    this.setState({ content });
  }

  saveNote = () => {
    console.log('saving note');
    const { edit, content } = this.state;
    window.localStorage.setItem('edit', JSON.stringify(edit));
    window.localStorage.setItem('content', content);
  }

  render() {
    let edit = this.state.edit;
    return (
      <div className='note'>
        <div className='noteHeader'>
          <div className='date'>{this.props.date}</div>
          <button 
            className='saveButton'
            onClick={this.saveNote}>
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button 
            className='deleteButton'
            onClick={this.props.deleteNote}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        {(edit) ? (
          <textarea className='noteEdit' default defaultValue={this.state.content} onFocus={this.selectText} onChange={this.editNote} onBlur={this.toggleEdit} />
          ) : (
          <div className='noteView' onClick={this.toggleEdit} dangerouslySetInnerHTML={this.getMarkdownText()} />
          )}      
      </div>
    );
  }
}

export default Note;