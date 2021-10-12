const getStatusColor = (status: string) => {
  switch (status) {
    case "done":
      return "green";
    case "doing":
      return "orange";
    case "todo":
      return "red";
    default:
      return "black";
  }
};

export default getStatusColor;
