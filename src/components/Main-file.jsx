
import Column from "./Column";
import { useTasks } from "../context/TasksContext.js";
import { statuses } from "../services/tasks.js";
import TaskLoadState from "./TaskLoadState";
import {
  MainWrapper,
  MainBlock,
  MainContent,
  MainStatuses,
} from "./Main-file.styled";

export default function Main() {
  const { tasks, loading, error, reload } = useTasks();

  return (
    <MainWrapper>
      <MainBlock>
        {loading ? (
          <TaskLoadState board />
        ) : error ? (
          <div className="task-state">
            <p>{error}</p>
            <button type="button" onClick={reload}>
              Повторить загрузку
            </button>
          </div>
        ) : (
          <>
            {tasks.length === 0 && (
              <p className="task-state" role="status">
                  Новых задач нет
              </p>      
            )}

            <MainContent>
              <MainStatuses>
                {statuses.map((status) => (
                  <Column
                    key={status}
                    title={status}
                    cards={tasks.filter(
                      (task) => task.status === status
                    )}
                  />
                ))}
              </MainStatuses>
            </MainContent>
          </>
        )}
      </MainBlock>
    </MainWrapper>
  );
}
