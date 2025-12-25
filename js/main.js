function dateFormat(date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}/${month}/${day}`;
}

function getDB(type) {
    const reqDate = type === 'today' ? dateFormat(new Date()) : dateFormat(new Date(Date.now() + 24 * 60 * 60 * 1000));

    const todoList = (() => {
        try {
            const data = localStorage.getItem("todoDB");
            if (data) {
                const pursedData = JSON.parse(data);
                pursedData['isOk'] = true;
                return pursedData;
            } else {
                localStorage.setItem("todoDB", JSON.stringify({}));
                return { isOk: true };
            }
        } catch (e) {
            console.error(e);
            return { isOk: false };
        }
    })();

    console.log(todoList);

    if (todoList.isOk) {
        if (Object.keys(todoList).length > 0) {
            if (reqDate in todoList) {
                const returnObj = {content: todoList[reqDate]};
                returnObj['isOk'] = true;
                returnObj['date'] = reqDate;
                return returnObj;
            } else {
                return { isOk: true, content: [], date: reqDate };
            }
        }
    } else {
        alert("Error loading database. Initializing new database.");
        return { isOk: false, content: [], date: null };
    }
}

const TODOLIST = (props) => {
    const toJapanese = props.name === "today" ? "今日" : "明日";
    const [todos, setTodos] = React.useState(getDB(props.name));

    console.log(todos);

    return (
        <div className="container">
            <h1>{toJapanese}のToDo</h1>
            {!todos.isOk ? (
                <p data-type="noneToDo">あれ？メモがなくなっちゃった...</p>
            ) : todos['content'].length > 0 ? (
                    <ul>
                        {todos['content'].map((item, num) => (
                            <li key={todos['date'] + '_' + num}><span className="todoTitle" data-completed={item['completed']}>{item['ttl']}</span><br /><span className="todoMemo">{item['memo']}</span></li>
                        ))}
                    </ul>
            ) : (
                <p data-type="noneToDo">今日はやらないといけないことがないよ！</p>
            )}
        </div>
    )
}

const CALENDAR = () => {
    return (
        <div className="container">
            <h2>CALENDAR VIEW</h2>
        </div>
    )
}

const BUTTOM_MENUE = React.memo(({ onToday, onTomorrow, onCalendar }) => {
    return (
        <div className="menueButtons">
            <button className="menueButton" onClick={onToday}>今日のToDo</button>
            <button className="menueButton" onClick={onTomorrow}>明日のToDo</button>
            <button className="menueButton" onClick={onCalendar}>カレンダー</button>
        </div>
    )
})

const App = () => {
    const [page, setPage] = React.useState("today");

    const menueFuncToday = React.useCallback(() => {
        setPage("today");
    }, []);
    const menueFuncTomorrow = React.useCallback(() => {
        setPage("tomorrow");
    }, []);
    const menueFuncCalendar = React.useCallback(() => {
        setPage("calendar");
    }, []);

    return (
        <div>{page === "calendar" ? (
            <CALENDAR />
        ) : (
            <TODOLIST name={page} />
        )}
            <BUTTOM_MENUE
                onToday={menueFuncToday}
                onTomorrow={menueFuncTomorrow}
                onCalendar={menueFuncCalendar} />
        </div>
    )
}

const container = document.getElementById('root')

const root = ReactDOM.createRoot(container)
root.render(<App />)