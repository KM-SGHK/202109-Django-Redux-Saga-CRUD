function App() {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  useEffect(() => {
    setList(tasks);
  }, [tasks]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World!</h1>
        {list.length > 0 &&
          list.map((e) => (
            <h3>
              {e.id}-{e.task_title}
            </h3>
          ))}
      </header>
    </div>
  );
}

export default App;