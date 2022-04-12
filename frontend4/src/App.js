import React from "react";
// Import the CustomModal that we created in Modal.js.
import Modal from "./components/Modal";
import RatingModal from "./components/rating"
import axios from "axios";

// We are creating a class component for our todo list and individual todo list
// items.
class App extends React.Component {
  // Here comes our constructor.
  constructor(props) {
    super(props);
    // The state object is initialized in the constructor of the component.
    // It has three properties, which we initialize:
    // viewCompleted (Boolean)
    // activeItem (object)
    // todoList (array).
    this.state = {
        songItem: {
        song: "",
        artist: "",
        rating: 0,
        username:'',
        password:'',
      },
        songList: []
    };
  }
  // The `componentDidMount()` method is called after the component is rendered,
  // at which point we call refreshList.
  // componentDidMount() is a React built-in function of a component's lifecycle.
  // See https://reactjs.org/docs/react-component.html#componentdidmount
  // componentDidMount() is invoked immediately after a component is mounted
  // (inserted into the DOM tree).
  componentDidMount() {
    this.refreshList();
  }
  // You can also define your custom functions in components as below.
  // We are using JavaScript arrow functions. There are no parameters () and
  // the function body executes an HTTP request.
  // We call refreshList multiple times during our code to send HTTP requests.
  refreshList = () => {
    // We are using the axios library for making HTTP requests.
    // Here is a GET request to our api/todos path.
    // If it succeeds, we set the todoList to the resolved data.
    // Otherwise, we catch the error and print it to the console (rejected data).
    // We are using async calls here. Please refer to the JavaScript
    // tutorial for how they work.


    axios

      .get("http://localhost:8000/api/Artists/")

      // To change a value in the `state` object for rendering, use `setState()`.
      // Here we get all todoList data. Each resolve (res) object has a data field.

      // To change a value in the `state` object for rendering, use `setState()`.
      // Here we get all todoList data. Each resolve (res) object has a data field.
      .then((res) => this.setState({ songList: res.data }))
      .catch((err) => console.log(err));
      console.log(this.state.songList);
  };

  // Another custom function.
  // The status parameter will receive a Boolean argument --- true or false ---
  // when the displayCompleted function is being called.

  // Another custom function.
  // Function for switching between the Complete and Incomplete task views.



  // Another custom function.
  // Function for managing the edit and delete views.
  renderItems = () => {
    return this.state.songList.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >

          {item.song},
          {item.artist}.
          {item.rating}

        {/* UI for editing and deleting items and their respective events. */}

        <span>
          <button
            // If the user clicks the Edit button, call the editItem function.
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            {" "}
            Edit{" "}
          </button>
          <button
            // If the user clicks the Delete button, call the handleDelete function.
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete{" "}
          </button>

          <button
            // If the user clicks the Delete button, call the handleDelete function.
            onClick={() => this.handleRate(item)}
            className="btn btn-danger"
          >
            Rate{" "}
          </button>

        </span>
      </li>

    ));

  };
  // Another custom function.
  // To change a value in the state object, use the this.setState() method.
  // When a value in the state object changes, the component will re-render the
  // page, meaning that the output will change according to the new value(s).
  toggle = () => {
    // We have a modal view below in the render() function.
    // Upon toggle, set the modal to false, i.e., do not show the modal.
    this.setState({ modal: !this.state.modal });
  };
  ratingtoggle = () => {
    // We have a modal view below in the render() function.
    // Upon toggle, set the modal to false, i.e., do not show the modal.
    this.setState({ ratingModal: !this.state.ratingModal });
  };
  // Another custom function.
  handleSubmit = (item) => {
    this.toggle();
    // If the item already exists in our database, i.e., we have an id for our
    // item, use a PUT request to modify it.
    if (item.id) {
      axios
        // Note that we are using backticks here instead of double quotes.
        // Backticks are useful because they allow us to use dynamic variables,
        // i.e., the item.id in this case. You can use this technique also
        // for authentication tokens.
        .put(`http://localhost:8000/api/Artists/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    // If the item does not yet exist, use a POST request to write to the
    // database.
    axios
      .post("http://localhost:8000/api/Artists/", item)
      .then((res) => this.refreshList());
  };

  handleRate = (item) => {
    this.ratingtoggle();
    // If the item already exists in our database, i.e., we have an id for our
    // item, use a PUT request to modify it.
    if (item.id) {
      axios
        // Note that we are using backticks here instead of double quotes.
        // Backticks are useful because they allow us to use dynamic variables,
        // i.e., the item.id in this case. You can use this technique also
        // for authentication tokens.
        .put(`http://localhost:8000/api/Ratings/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    console.log(item.id)
    // If the item does not yet exist, use a POST request to write to the
    // database.
    axios
      .post("http://localhost:8000/api/Ratings/", item)
      .then((res) => this.refreshList());
  };
  // Another custom function.
  // If the user triggers a delete event, send a delete request.
  handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/Artists/${item.song}`)
      .then((res) => this.refreshList());
  };
  // Another custom function.
  // If the user triggers a createItem event (by clicking on Add task), create
  // a new item with default values and set the modal to false.
  createItem = () => {
    const item = { song: "", artist: ""};
    this.setState({ songItem: item, modal: !this.state.modal });
  };
  createUser = () => {
    const item = { username: "", password: ""};
    this.setState({ songItem: item, usermodal: !this.state.usermodal });
  };
  createRate = () => {
    const item = { username: "", rating: ""};
    this.setState({ songItem: item, ratingmodal: !this.state.ratingmodal });
  };
  // Another custom function.
  // If the use triggers an editItem event.
  editItem = (item) => {
    this.setState({ songItem: item, modal: !this.state.modal });
  };
  rateItem = item => {
    this.setState({ songItem: item, ratingModal: !this.state.ratingModal });
  };
  // The `render()` method is the only required method in a class component.
  // When called, it will render the page. You do not have to specifically
  // call render() in your component. Rather, the stub code with the
  // ReactDOM.render(...) in your index.js will do that for you.
  render() {
    return (
      <main className="content">
        <h1 className="Stitle">Music Rating App</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
            <div className="y">
               {/* If the user clicks the Add task button, call the createItem function. */}
              <button class = 'b' onClick={this.createUser} className="btn btn-primary">
                Sign in

              </button>
            </div>
              <div className="y">
                 {/* If the user clicks the Add task button, call the createItem function. */}
                <button class = 'b' onClick={this.createItem} className="btn btn-primary">
                  Add song

                </button>
              </div>

              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {/* If the modal state is true, show the modal component. */}

        {this.state.modal ? (
          <Modal

            songItem={this.state.songItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
        {this.state.ratingModal ? (
          <RatingModal

            songItem={this.state.songItem}
            ratingtoggle={this.ratingtoggle}
            onSave={this.handleRate}
          />
        ) : null}
      </main>
    );
  }

}



// Export our App so that it can be rendered in index.js, where it is imported.
export default App;
