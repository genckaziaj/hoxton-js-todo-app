/*
Description
In this exercise we explore how to build a simple todo app, one of the most common starter projects whenever you are learning a new technology. The great thing about todo apps is that you already know how they work, so you can focus on how to build it rather than what to build.

Deliverables
A user can:
- View incomplete todos
- When the "Show completed todos" box is checked, view completed todos as well
- Enter a new todo, which will initially show as incomplete
- Click a todo to toggle its completion

Instructions
- Start this project from scratch, write whatever HTML, CSS & JS you need
- Create a state object
- Create action functions that update state
- Create render functions that read from state

If you're not feeling it, feel free to use this template: https://codesandbox.io/s/todo-state-template-ejekb?from-embed=&file=/src/index.js

Tips
- Try starting with state. Create the state for the todos, then a function to toggle a todo's completed state, a function to add a new todo, etc.
- You can test these functions before you even render anything on the page, just by calling the functions in your js file.
*/

let state = {
  todos: [
    {
      text: "Go Shopping",
      completed: false,
    },
    {
      text: "Work out",
      completed: false,
    },
    {
      text: "See the doctor",
      completed: true,
    },
  ],
  showCompleted: true,
};

// Actions - functions that just change state
// (and maybe rerender if you want to)
// You can test these functions in the console
// Before you even write any event listeners, or even HTML
function toggleShowCompleted() {
  state.showCompleted = !state.showCompleted;
  render();
}

function addTodo(text) {
  if (text.length === 0) return;

  let foundMatch = state.todos.some((todo) => todo.text === text);
  if (foundMatch) return;

  state.todos.push({ text: text, completed: false });
}

function deleteTodo(text) {
  let updatedTodos = state.todos.filter((todo) => todo.text !== text);
  state.todos = updatedTodos;
}

// Rendering

function renderApp() {
  let appEl = document.createElement("div");
  appEl.className = "app";
  document.body.append(appEl);
}

function renderOptionsSection() {
  let optionsSection = document.createElement("section");
  optionsSection.classList.add("options");

  let optionsTitle = document.createElement("h2");
  optionsTitle.classList.add("section__title");
  optionsTitle.innerText = "Options";

  let showCompletedLabel = document.createElement("label");

  let showCompletedInput = document.createElement("input");
  showCompletedInput.type = "checkbox";
  showCompletedLabel.append("Show completed", showCompletedInput);
  if (state.showCompleted === true) {
    showCompletedInput.checked = true;
  }

  optionsSection.append(optionsTitle, showCompletedLabel);

  let appEl = document.querySelector(".app");
  appEl.append(optionsSection);

  showCompletedInput.addEventListener("click", toggleShowCompleted);
}

function renderAddTodoSection() {
  //     <section class="add-item">
  //       <h2 class="section__title">Add Item</h2>
  //       <form>
  //         <input type="text" />
  //         <button>Add</button>
  //       </form>
  //     </section>

  let addTodoSection = document.createElement("section");
  addTodoSection.classList.add("add-item");

  let addTitle = document.createElement("h2");
  addTitle.classList.add("section__title");
  addTitle.innerText = "Add Item";

  let addForm = document.createElement("form");

  let addTodoInput = document.createElement("input");
  addTodoInput.type = "text";
  let addTodoButton = document.createElement("button");
  addTodoButton.innerText = "Add";

  addForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo(addTodoInput.value);
    render();
  });

  addForm.append(addTodoInput, addTodoButton);
  addTodoSection.append(addTitle, addForm);

  let appEl = document.querySelector(".app");
  appEl.append(addTodoSection);
}

function renderTodoSection() {
  let todoSection = document.createElement("section");

  let titleEl = document.createElement("h2");
  titleEl.className = "section__title";
  titleEl.innerText = "Todo";

  let todoListEl = document.createElement("ul");
  todoListEl.className = "todo-list";

  let incompleTodos = state.todos.filter((todo) => todo.completed === false);

  for (let todo of incompleTodos) {
    // START - This code creates a single todo
    let todoItemEl = document.createElement("li");
    todoItemEl.className = "todo";

    let checkboxEl = document.createElement("input");
    checkboxEl.type = "checkbox";
    checkboxEl.className = "todo__checkbox";

    let todoTextEl = document.createElement("p");
    todoTextEl.className = "todo__text";
    todoTextEl.innerText = todo.text;

    let deleteButtonEl = document.createElement("button");
    deleteButtonEl.className = "todo__delete";
    deleteButtonEl.innerText = "Delete";

    todoItemEl.append(checkboxEl, todoTextEl, deleteButtonEl);

    todoListEl.append(todoItemEl);
    // END - This code creates a single todo

    checkboxEl.addEventListener("click", function () {
      todo.completed = true;
      render();
    });

    deleteButtonEl.addEventListener("click", function () {
      deleteTodo(todo.text);
      render();
    });
  }

  todoSection.append(titleEl, todoListEl);

  let appEl = document.querySelector(".app");
  appEl.append(todoSection);
}

function renderCompletedTodosSection() {
  //     <section>
  //       <h2 class="section__title">Completed</h2>
  //       <ul class="completed-todo-list">
  //         <li class="todo">
  //           <input type="checkbox" checked />
  //           <p class="completed">See the doctor</p>
  //           <button>Delete</button>
  //         </li>
  //       </ul>
  //     </section>

  let completedTodoSection = document.createElement("section");

  let titleEl = document.createElement("h2");
  titleEl.className = "section__title";
  titleEl.innerText = "Completed";

  let todoListEl = document.createElement("ul");
  todoListEl.className = "completed-todo-list";

  let completeTodos = state.todos.filter((todo) => todo.completed === true);

  for (let todo of completeTodos) {
    // START - This code creates a single todo
    let todoItemEl = document.createElement("li");
    todoItemEl.className = "todo";

    let checkboxEl = document.createElement("input");
    checkboxEl.type = "checkbox";
    checkboxEl.checked = true;

    let todoTextEl = document.createElement("p");
    todoTextEl.className = "todo__text completed";
    todoTextEl.innerText = todo.text;

    let deleteButtonEl = document.createElement("button");
    deleteButtonEl.className = "todo__delete";
    deleteButtonEl.innerText = "Delete";

    todoItemEl.append(checkboxEl, todoTextEl, deleteButtonEl);

    todoListEl.append(todoItemEl);

    checkboxEl.addEventListener("click", function () {
      todo.completed = false;
      render();
    });

    deleteButtonEl.addEventListener("click", function () {
      deleteTodo(todo.text);
      render();
    });
  }

  completedTodoSection.append(titleEl, todoListEl);

  let appEl = document.querySelector(".app");
  appEl.append(completedTodoSection);

  if (state.showCompleted === false) {
    completedTodoSection.style.display = "none";
  }
}

function render() {
  document.body.textContent = "";

  renderApp();
  renderOptionsSection();
  renderAddTodoSection();
  renderTodoSection();
  renderCompletedTodosSection();
}

render();
