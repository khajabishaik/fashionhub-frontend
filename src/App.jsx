import Navbar from "./components/Navbar.jsx";
import AppRoutes from "./routes/AppRoutes";

function App() {

  return (
    <>
      <Navbar />

      <main>
        <AppRoutes />
      </main>
    </>
  );
}

export default App;