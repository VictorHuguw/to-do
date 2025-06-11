import { Plus, ClipboardText } from "phosphor-react";
import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./app.module.css";
import { Header } from "./components/Header";
import { Task } from "./components/Task";
import { TaskProps } from "./types/Task";
import { ToastContainer, toast } from "react-toastify";

const data = [
  {
    id: uuidv4(),
    title: "Tarefa 1",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Tarefa 2",
    isCompleted: false,
  },
];

export function App() {
  const [tasks, setTasks] = useState<TaskProps[]>(data);
  const [newTask, setNewTask] = useState("");

  const handleNewTaskChange = (event: any) => {
    event.preventDefault();
    setNewTask(event.target.value);
  };

  const handleCreateTask = (event: any) => {
    event.preventDefault();

    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        title: newTask,
        isCompleted: false,
      },
    ]);

    setNewTask("");

    toast.success("Tarefa criada com sucesso", {
      autoClose: 1000,
      hideProgressBar: false,
      closeButton: false,
    });
  };

  const completeTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
    toast.info("Tarefa removida", {
      autoClose: 1000,
      hideProgressBar: false,
      closeButton: false,
    });
  };

  const totalCompleted = useMemo(() => {
    return tasks.filter((task) => task.isCompleted).length;
  }, [tasks]);

  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <form className={styles.taskForm} onSubmit={handleCreateTask}>
          <input
            type="text"
            placeholder="Adicione uma tarefa"
            aria-label="Adicione uma tarefa"
            value={newTask}
            onChange={handleNewTaskChange}
            required
          />
          <button type="submit" className={styles.addButton}>
            <Plus
              size={20}
              style={{
                cursor: "pointer",
              }}
            />
          </button>
        </form>
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <div>
              <strong>Tarefas criadas</strong>
              <span>{tasks.length}</span>
            </div>

            <div>
              <strong>Concluídas</strong>
              <span>
                {totalCompleted} de {tasks.length}
              </span>
            </div>
          </div>
          <div className={styles.contentBox}>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Task
                  id={task.id}
                  key={task.id}
                  checked={task.isCompleted}
                  title={task.title}
                  onComplete={completeTask}
                  onDelete={deleteTask}
                />
              ))
            ) : (
              <>
                <ClipboardText size={56} />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <small>Crie tarefas e organize seus itens a fazer</small>
              </>
            )}
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}
