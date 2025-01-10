import InputTask from "./components/InputTask";
import ListTask from "./components/ListTask";

function App() {
  return (
    <main className="flex justify-center items-center container px-4 max-w-full h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-indigo-950">
      <section className="w-full md:w-3/4 lg:w-1/2 p-5 bg-sky-950 rounded-md text-slate-100">
        <h1 className="text-center text-2xl font-bold">Task App</h1>
        <InputTask />
        <ListTask />
      </section>
    </main>
  );
}

export default App;
