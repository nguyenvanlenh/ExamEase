import {
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";
import { fetchTodos } from "./redux/slices/counterSlice";
import { useDispatch } from "react-redux";
import { router } from "./routes/Router";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [])

  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

export default App;
