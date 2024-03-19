import {
  RouterProvider,
} from "react-router-dom";
import { router } from "./Router";
import { useEffect } from "react";
import { fetchTodos } from "./redux/slices/counterSlice";
import { useDispatch } from "react-redux";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [])

  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

export default App;
