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

  const installPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("User accepted the PWA installation");
        }
      });
    }
  };

  return (
    <div className="App">
      <MyNavbar />
      <UsersList />

      {/* Show install button if PWA is not installed */}
      {!isPWAInstalled && deferredPrompt && (
        <button onClick={installPWA} style={{ margin: "20px", padding: "10px" }}>
          Install PWA
        </button>
      )}
    </div>
  );
}

export default App;
