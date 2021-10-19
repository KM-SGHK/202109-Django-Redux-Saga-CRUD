export async function fetchTasks() {
  const res = await fetch("http://127.0.0.1:8000/tasks", {
    method: "GET",
  });
  const result = await res.json();
  return result;
}

export async function postTasks(payload) {
  const res = await fetch("http://127.0.0.1:8000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await res.json();
  console.log("checking api results in api.js", result);
  return result;
}

export async function updateTasks(id, updateData) {
  console.log('checking updateData in api.js, ', updateData)
  const res = await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });
  const result = await res.json();
  console.log("checking api results from PUT Case in api.js", result);
  return result;
}

export async function deleteTasks(id) {
  console.log('checking deleteData in api.js, ', id)
  const result = await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // const result = await res.json();
  console.log("checking api results from DELETE Case in api.js", result);
  return result;
}
