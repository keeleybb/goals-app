import axios from "axios";

export default {
  //Goal Routes
  //Get all goals
  getGoals: function () {
    return axios.get("/api/goal");
  },
  // Gets goals by user
  getGoalsbyUser: function (id) {
    return axios.get("/api/goal/user");
  },
  // Saves a goal
  saveGoal: function (goalData) {
    return axios.post("/api/goal", goalData);
  },
  //Delete a goal
  deleteGoal: function (id) {
    console.log("API/utils Goal id: ", id)
    return axios.delete("/api/goal/" + id);
  },
  // Task Routes
  //save task
  saveTask: function (id, TaskData) {
    console.log("ID from utils/api", TaskData)
    return axios.put("/api/goal/" + id, TaskData);
  },
  //mark a task complete
  completeTask: function (id, TaskData) {
    console.log("From utils/api", TaskData)
    return axios.put("/api/goal/task/" + id, TaskData);
  },
  //Delete a task
  removeTask: function (id, TaskData) {
    console.log("From utils/api for remove", TaskData)
    return axios.put("/api/goal/task-remove/" + id, TaskData);
  },
  //Soul Time
  getSouls: function () {
    return axios.get("/api/soul");
  },
  // Gets the book with the given id
  getSoul: function (id) {
    return axios.get("/api/soul/" + id);
  },
  // Deletes the book with the given id
  deleteSoul: function (id) {
    return axios.delete("/api/soul/" + id);
  },
  // Saves a book to the database
  saveSoul: function (soulData) {
    return axios.post("/api/soul", soulData);
  },
  //User routes
  getUser: function () {
    return axios.get("/api/user");
  },
  getUsers: function (id) {
    return axios.get("/api/user/" + id);
  },
  deleteUser: function (id) {
    return axios.delete("/api/user/" + id);
  },
  saveUsers: function (userData) {
    return axios.post("/api/user", userData);
  },
  // user signup / login
  loginSignup: ({ username, password, email, login }) => login ? axios.post('/api/user/login', { username: username, password: password }) : axios.post('/api/user/signup', { username: username, password: password, email: email }),
  //all new from todo app
  // register a user
  register: function (userInput) {
    console.log("user input from utils ", userInput)
    return axios.post("/api/user", {
      username: userInput.username,
      email: userInput.email,
      password: userInput.password
    });
  },
  // login a user
  login: function (userInput) {
    return axios.post("/api/user/login", {
      username: userInput.username,
      // email: userInput.email,
      password: userInput.password
    });
  },
  // logout a user
  logout: function () {
    return axios.post("/api/user/logout");
  },
  // see if user is logged in
  status: function () {
    return axios.get('/api/user')
  }
};
