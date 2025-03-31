import { Provider } from "react-redux";
import Home from "./pages/Home";
import { store }from "./redux/store";

function App(){
  return(
    <Provider store={store}>
      <div>
        <Home />
      </div>
    </Provider>
  )
}

export default App;