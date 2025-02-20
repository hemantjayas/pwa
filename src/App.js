import { useEffect, useState } from "react";
import "./App.css";
import UsersList from "./UserList";
import MyNavbar from "./MyNavbar";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);

  useEffect(() => {
    // Listen for the "beforeinstallprompt" event
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    });

    // Check if the PWA is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsPWAInstalled(true);
    }
  }, []);


  return (
    <div className="App">
      <MyNavbar />
      <UsersList />

     
    </div>
  );
}

export default App;
