// this is to emulate json request that we are going to send to backend later, this will be replaced with backend request in latter commits.
export const DEFAULT_CARDS = [
  // BACKLOG
  { title: "Fix the API route Bug", id: "1", column: "backlog" },
  {
    title: "Feature: add new models and schema for user ",
    id: "2",
    column: "backlog",
  },
  {
    title: "Refractor: refractor the routes in backend",
    id: "3",
    column: "backlog",
  },
  {
    title: "Add the routing for all the required path",
    id: "4",
    column: "backlog",
  },
  // TODO
  {
    title: "Use env variable and dotenv instead of hardcoding",
    id: "5",
    column: "todo",
  },
  {
    title: "Use mongoose for making model and schema",
    id: "6",
    column: "todo",
  },
  {
    title:
      "change the port to 3002 instead of 3001 as it conflict with frontend",
    id: "7",
    column: "todo",
  },

  // DOING
  {
    title: "Add all the docs to some note taking app",
    id: "8",
    column: "doing",
  },
  {
    title: "Make a report of all the work and commit of the weeks",
    id: "9",
    column: "doing",
  },
  // DONE
  {
    title: "Live the usable backend",
    id: "10",
    column: "done",
  },
];
