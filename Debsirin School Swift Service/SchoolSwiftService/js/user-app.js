function App() {
  const [issues, setIssues] = useState([]);
  const [view, setView] = useState("form");

  const handleSubmitSuccess = useCallback(() => {
    setView("dashboard");
  }, []);

  return (
    <div className="min-h-screen">
      <nav className="bg-green-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold">ระบบรายงานปัญหา</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView(view === "form" ? "dashboard" : "form")}
              className="bg-white text-green-800 px-4 py-2 rounded-md font-medium text-sm sm:text-base"
            >
              {view === "form" ? "Dashboard" : "รายงานปัญหา"}
            </button>
          </div>
        </div>
      </nav>
      {view === "form" ? (
        <IssueForm
          setIssues={setIssues}
          onSubmitSuccess={handleSubmitSuccess}
        />
      ) : (
        <Dashboard issues={issues} setIssues={setIssues} />
      )}
    </div>
  );
}

// Render App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
