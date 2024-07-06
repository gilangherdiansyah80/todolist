import { useState, useEffect } from 'react';

const App = () => {
  const [day, setDay] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [showTodo, setShowTodo] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const activity = event.target.activity.value;
    const timeStart = event.target['time-start'].value;
    const timeEnd = event.target['time-end'].value;
    const newTodo = { activity, timeStart, timeEnd, checked: false };
    const updatedTodoList = [...todoList, newTodo];
    setTodoList(updatedTodoList);
    localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
    setShowTodo(true);
  };

  useEffect(() => {
    const storedTodoList = localStorage.getItem('todoList');
    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
      setShowTodo(true);
    }
    const storedDay = localStorage.getItem('day');
    if (storedDay) {
      setDay(storedDay);
    }
  }, []);

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem('todoList', JSON.stringify(todoList));
    } else {
      localStorage.removeItem('todoList');
    }
  }, [todoList]);

  useEffect(() => {
    if (day) {
      localStorage.setItem('day', day);
    } else {
      localStorage.removeItem('day');
    }
  }, [day]);

  const handleDelete = (index) => {
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
    if (newTodoList.length === 0) {
      setShowTodo(false);
    }
  };

  const handleCheck = (index) => {
    const newTodoList = [...todoList];
    newTodoList[index].checked = !newTodoList[index].checked;
    setTodoList(newTodoList);
  };

  const handleClear = () => {
    setTodoList([]);
    localStorage.removeItem('todoList');
    setShowTodo(false);
  };

  const handleDay = (hari) => {
    setDay(hari);
  };

  return (
    <div className="p-3 flex justify-center items-center w-full">
      <div className="w-full lg:w-1/2 self-center border-4 p-5 rounded-xl border-solid border-blue-500 flex flex-col gap-y-10 md:gap-y-20">
        <h1 className="text-center font-bold text-3xl md:text-5xl">My Todo-list</h1>
        
        <div className='flex flex-col gap-y-3'>
          <div className='flex gap-x-3 md:justify-center'>
            <div className={`text-lg ${day === 'Minggu' ? 'bg-blue-900' : 'bg-blue-500'} text-white w-10 h-10 rounded-full flex justify-center items-center`} onClick={() => handleDay('Minggu')}>M</div>
            <div className={`text-lg ${day === 'Senin' ? 'bg-blue-900' : 'bg-blue-500'} text-white w-10 h-10 rounded-full flex justify-center items-center`} onClick={() => handleDay('Senin')}>S</div>
            <div className={`text-lg ${day === 'Selasa' ? 'bg-blue-900' : 'bg-blue-500'} text-white w-10 h-10 rounded-full flex justify-center items-center`} onClick={() => handleDay('Selasa')}>S</div>
            <div className={`text-lg ${day === 'Rabu' ? 'bg-blue-900' : 'bg-blue-500'} text-white w-10 h-10 rounded-full flex justify-center items-center`} onClick={() => handleDay('Rabu')}>R</div>
            <div className={`text-lg ${day === 'Kamis' ? 'bg-blue-900' : 'bg-blue-500'} text-white w-10 h-10 rounded-full flex justify-center items-center`} onClick={() => handleDay('Kamis')}>K</div>
            <div className={`text-lg ${day === 'Jumat' ? 'bg-blue-900' : 'bg-blue-500'} text-white w-10 h-10 rounded-full flex justify-center items-center`} onClick={() => handleDay('Jumat')}>J</div>
            <div className={`text-lg ${day === 'Sabtu' ? 'bg-blue-900' : 'bg-blue-500'} text-white w-10 h-10 rounded-full flex justify-center items-center`} onClick={() => handleDay('Sabtu')}>S</div>
          </div>
          <form className="w-full flex flex-col border-solid border-blue-500 border-4 rounded-xl p-3 gap-y-5" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-y-3">
              <label htmlFor="activity" className="font-semibold text-lg md:text-3xl">Activity :</label>
              <input type="text" id="activity" name="activity" className="border-2 border-solid border-blue-500 p-3 rounded-xl bg-blue-500 text-white text-lg md:text-xl" />
            </div>
            <div className="w-full flex gap-x-5 md:gap-x-8">
              <div className="w-full flex flex-col gap-y-3">
                <label htmlFor="time-start" className="font-semibold text-lg md:text-3xl">Start Time :</label>
                <input type="time" id="time-start" name="time-start" className="border-2 border-solid border-blue-500 p-3 rounded-xl bg-blue-500 text-white text-lg md:text-xl" />
              </div>
              <div className="w-full flex flex-col gap-y-3">
                <label htmlFor="time-end" className="font-semibold text-lg md:text-3xl">End Time :</label>
                <input type="time" id="time-end" name="time-end" className="border-2 border-solid border-blue-500 p-3 rounded-xl bg-blue-500 text-white text-lg md:text-xl" />
              </div>
            </div>
            <div className="flex flex-col gap-y-3">
              <button type="submit" className="w-full bg-blue-500 p-3 rounded-xl text-white font-semibold text-lg md:text-3xl">Create</button>
              <button type="reset" className="w-full bg-blue-500 p-3 rounded-xl text-white font-semibold text-lg md:text-3xl">Clear</button>
            </div>
          </form>
        </div>
        
        <section className='flex flex-col gap-y-3'>
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-semibold md:text-3xl'>Todo-list : {day}</h2>
            <button className='bg-blue-500 px-3 md:p-3 rounded-full text-white font-semibold text-lg md:text-3xl' onClick={handleClear}>Clear</button>
          </div>
          <div className='w-full flex flex-col border-solid border-blue-500 border-4 rounded-xl p-3 gap-y-5'>
            {showTodo ? (
              <div className='w-full flex flex-col gap-y-3 md:grid md:grid-cols-3 md:gap-5'>
                {todoList.map((todo, index) => (
                  <div 
                    key={index} 
                    className="card w-full flex gap-y-3 justify-between items-center bg-blue-500 p-3 rounded-xl text-white"
                    style={{ opacity: todo.checked ? '0.5' : 'none' }}
                  >
                    <div className='flex flex-col gap-y-3'>
                      <p>Activity : {todo.activity}</p>
                      <p>Time : {todo.timeStart} - {todo.timeEnd}</p>
                    </div>
                    <div className='flex gap-x-5'>
                      <i 
                        className={`fa-solid fa-check text-3xl ${todo.checked ? 'text-gray-400' : 'text-green-700'}`} 
                        onClick={() => handleCheck(index)}
                      />
                      <i 
                        className={`fa-solid fa-trash text-3xl ${todo.checked ? 'text-gray-400' : 'text-red-700'}`} 
                        onClick={() => handleDelete(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-black text-center xl:text-center'>No Activity</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
