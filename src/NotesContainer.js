import React from 'react';
import './NotesContainer.css';
import Note from './Note';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [{
        date: 'Monday February 24, 2020 at 1:44PM'
      }]   
    }
  }

  componentDidMount() {
    const notes = window.localStorage.getItem('notes') === 'true';
    if (notes === 'true') {
      this.setState({ notes });
    }
    else return;
  }

  componentDidUpdate() {
    this.saveNotes();
  }

  addNote = () => {
    let today = new Date().getTime();
    function convertDate(d) {
      const now = new Date(d);
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      const day = days[now.getDay()];
      const year = now.getFullYear();
      const month = months[now.getMonth()];
      const date = now.getDate();
      let hour = now.getHours();
      let mer = 'AM';
      if (hour > 12) {
        hour -= 12;
        mer = 'PM';
      }
      const min = now.getMinutes();
      const time = day + ' ' + month + ' ' + date + ', ' + year + ' at ' + hour + ':' + min + mer;
      return time;
    }
    const newNote = {
      date: convertDate(today),
    };
    this.setState({
      notes: [...this.state.notes, newNote]
    });
  }

  saveNotes = () => {
    const { notes } = this.state;
    window.localStorage.setItem('notes', notes);
  }

  deleteNote = (i) => {
    const tempNotes = [...this.state.notes];
    console.log(tempNotes);
    tempNotes.splice(i, 1);
    this.setState({
      notes: tempNotes
    })
  }

  render() {
    console.log(this.state.notes);
    return (
    <div className='notesContainer'>
      <div className='pageHeader'>
        <h1 className='title'>Markdown Notes</h1>
        <button
          className='addButton'
          type='button'
          onClick={this.addNote}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {
        (this.state.notes.length > 0) ?
        this.state.notes.map((note, index) => {
          return (
            <div key={note.date}>
              <Note 
                index={index}
                date={note.date}
                deleteNote={() => this.deleteNote(index)}
              />
            </div>
        )}) : null
      }
    </div>
    );
    }
}

export default NotesContainer;
