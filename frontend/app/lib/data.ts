
export async function fetchAllTodos() {  
  try {
    let res = await fetch("http://127.0.0.1:8000/todos/", {method: "GET"});
    let data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    throw new Error('Failed to fetch todos.');
  }
}

export async function fetchFilteredTodos(query: string, page: number) {  
  try {
    let res = await fetch(`http://127.0.0.1:8000/filteredtodos?query=${query}&page=${page}`, {method: "GET"});
    let data = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    throw new Error('Failed to fetch todos.');
  }
}

export async function fetchTodoPages(query: string) {  
  try {
    let res = await fetch(`http://127.0.0.1:8000/todopages?query=${query}`, {method: "GET"});
    let data = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    throw new Error('Failed to fetch todos.');
  }
}
