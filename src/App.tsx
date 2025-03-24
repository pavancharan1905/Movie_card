import Home from "./pages/Home";
import { store } from "./redux/store";

function App(){
  return(
    <Provider store={store}>
    <div>
      <h1>App</h1>
      <Home/>
    </div>
    </Provider>
  )
}

export default App;
