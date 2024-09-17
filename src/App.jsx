import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Save, Trash } from "lucide-react";

const initialColorMap = {
  Marketing: "bg-red-200",
  "Soporte IT": "bg-blue-200",
  "Gestión de proyectos": "bg-green-200",
  "IT automatización con Python": "bg-yellow-200",
  "Diseño y experiencia de usuario": "bg-purple-200",
  "Análisis de datos": "bg-pink-200",
  "Proyectos 42 Madrid": "bg-orange-200",
  Gimnasio: "bg-gray-200",
  Descanso: "bg-teal-100",
  Comida: "bg-teal-200",
};

const initialSchedule = [
  {
    time: "07:30 - 08:00",
    lunes: "Desayuno",
    martes: "Desayuno",
    miercoles: "Desayuno",
    jueves: "Desayuno",
    viernes: "Desayuno",
    sabado: "Desayuno",
  },
  {
    time: "08:00 - 09:30",
    lunes: "Marketing",
    martes: "Soporte IT",
    miercoles: "Gestión de proyectos",
    jueves: "IT automatización con Python",
    viernes: "Diseño y experiencia de usuario",
    sabado: "Análisis de datos",
  },
  {
    time: "09:30 - 11:00",
    lunes: "Soporte IT",
    martes: "Gestión de proyectos",
    miercoles: "IT automatización con Python",
    jueves: "Diseño y experiencia de usuario",
    viernes: "Análisis de datos",
    sabado: "Marketing",
  },
  {
    time: "11:00 - 12:30",
    lunes: "Gestión de proyectos",
    martes: "IT automatización con Python",
    miercoles: "Diseño y experiencia de usuario",
    jueves: "Análisis de datos",
    viernes: "Marketing",
    sabado: "Soporte IT",
  },
  {
    time: "12:30 - 15:00",
    lunes: "Proyectos 42 Madrid",
    martes: "Proyectos 42 Madrid",
    miercoles: "Proyectos 42 Madrid",
    jueves: "Proyectos 42 Madrid",
    viernes: "Proyectos 42 Madrid",
    sabado: "Descanso",
  },
  {
    time: "15:00 - 16:15",
    lunes: "Comida",
    martes: "Comida",
    miercoles: "Comida",
    jueves: "Comida",
    viernes: "Comida",
    sabado: "Comida",
  },
  {
    time: "16:15 - 17:45",
    lunes: "Gimnasio",
    martes: "Gimnasio",
    miercoles: "Gimnasio",
    jueves: "Gimnasio",
    viernes: "Gimnasio",
    sabado: "Libre",
  },
  {
    time: "17:45 - 21:00",
    lunes: "Proyectos 42 Madrid",
    martes: "Proyectos 42 Madrid",
    miercoles: "Proyectos 42 Madrid",
    jueves: "Proyectos 42 Madrid",
    viernes: "Proyectos 42 Madrid",
    sabado: "Libre",
  },
];

const App = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentActivity, setCurrentActivity] = useState("");
  const [logs, setLogs] = useState([]);
  const [selectedDay, setSelectedDay] = useState("lunes");
  const [schedule, setSchedule] = useState(initialSchedule);
  const [colorMap, setColorMap] = useState(initialColorMap);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const savedLogs = localStorage.getItem("activityLogs");
    if (savedLogs) setLogs(JSON.parse(savedLogs));

    const savedSchedule = localStorage.getItem("schedule");
    if (savedSchedule) setSchedule(JSON.parse(savedSchedule));

    const savedColorMap = localStorage.getItem("colorMap");
    if (savedColorMap) setColorMap(JSON.parse(savedColorMap));
  }, []);

  useEffect(() => {
    localStorage.setItem("activityLogs", JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem("schedule", JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem("colorMap", JSON.stringify(colorMap));
  }, [colorMap]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime + 1 === 5400) {
            // 90 minutes
            playAlertSound();
          }
          return prevTime + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  const logActivity = () => {
    if (currentActivity && time > 0) {
      setLogs([...logs, { activity: currentActivity, time }]);
      resetTimer();
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startActivity = (activity) => {
    if (currentActivity) {
      logActivity();
    }
    setCurrentActivity(activity);
    resetTimer();
    setIsRunning(true);
  };

  const deleteLog = (index) => {
    const newLogs = [...logs];
    newLogs.splice(index, 1);
    setLogs(newLogs);
  };

  const resetAll = () => {
    setLogs([]);
    setSchedule(initialSchedule);
    setColorMap(initialColorMap);
    resetTimer();
    localStorage.clear();
  };

  const playAlertSound = () => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440 Hz = A4 note
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1); // Play for 1 second
  };

  const handleCellEdit = (rowIndex, day, value) => {
    const newSchedule = [...schedule];
    newSchedule[rowIndex][day] = value;
    setSchedule(newSchedule);
    setEditingCell(null);
    setEditValue("");
  };

  const startEditing = (rowIndex, day, value) => {
    setEditingCell(`${rowIndex}-${day}`);
    setEditValue(value);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">
        Horario Semanal con Temporizador
      </h2>

      <div className="flex justify-center space-x-2 mb-4">
        {["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"].map(
          (day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1 rounded ${
                selectedDay === day ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
          )
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold mb-2">
            Horario del{" "}
            {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}
          </h3>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-24 py-2 px-4 border-b">Hora</th>
                <th className="py-2 px-4 border-b">Actividad</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b font-medium">{row.time}</td>
                  <td
                    className={`py-2 px-4 border-b text-center ${
                      colorMap[row[selectedDay]] || ""
                    } cursor-pointer hover:opacity-80`}
                    onClick={() =>
                      editingCell !== `${index}-${selectedDay}` &&
                      startActivity(row[selectedDay])
                    }
                  >
                    {editingCell === `${index}-${selectedDay}` ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={() =>
                          handleCellEdit(index, selectedDay, editValue)
                        }
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleCellEdit(index, selectedDay, editValue);
                          }
                        }}
                        autoFocus
                        className="w-full bg-white text-center"
                      />
                    ) : (
                      <span
                        onDoubleClick={() =>
                          startEditing(index, selectedDay, row[selectedDay])
                        }
                      >
                        {row[selectedDay]}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="font-bold mb-2">Temporizador de Actividades</h3>
          <div className="p-4 bg-gray-100 rounded-xl space-y-4">
            <div className="text-4xl font-mono text-center">
              {formatTime(time)}
            </div>
            <div className="text-center font-bold">
              {currentActivity || "Ninguna actividad seleccionada"}
            </div>
            <div className="flex justify-center space-x-2">
              <button
                onClick={toggleTimer}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {isRunning ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button
                onClick={resetTimer}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <RotateCcw size={24} />
              </button>
              <button
                onClick={logActivity}
                className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                <Save size={24} />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-bold">Registro de Actividades:</h3>
            <ul className="list-disc list-inside">
              {logs.map((log, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>
                    {log.activity}: {formatTime(log.time)}
                  </span>
                  <button
                    onClick={() => deleteLog(index)}
                    className="text-red-500"
                  >
                    <Trash size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={resetAll}
            className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
          >
            Reset Total
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
