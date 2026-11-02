
import { useTasks } from "../context/TasksContext.js";
import { statuses } from "../services/tasks.js";

import {
  LoadingState,
  Spinner,
  SkeletonBoard,
  SkeletonColumn,
  SkeletonHeading,
  SkeletonCards,
  SkeletonCard,
  SkeletonLine,
} from "./TaskLoadState.styled.js";

export default function TaskLoadState({ missing = false, board = false }) {
  const { loading, error, reload } = useTasks();

  if (loading) {
    if (board) {
      return (
        <SkeletonBoard role="status" aria-label="Загрузка задач">
          {statuses.map((status) => (
            <SkeletonColumn key={status}>
              <SkeletonHeading />

              <SkeletonCards>
                {[1, 2, 3].map((item) => (
                  <SkeletonCard key={item}>
                    <SkeletonLine $width="42%" />
                    <SkeletonLine $width="85%" />
                    <SkeletonLine $width="65%" />
                  </SkeletonCard>
                ))}
              </SkeletonCards>
            </SkeletonColumn>
          ))}
        </SkeletonBoard>
      );
    }

    return (
      <LoadingState role="status" aria-live="polite">
        <Spinner aria-hidden="true" />
        <p>Загрузка задач…</p>
      </LoadingState>
    );
  }

  if (error) {
    return (
      <div className="task-state" role="alert">
        <p>{error}</p>
        <button type="button" onClick={reload}>
          Повторить
        </button>
      </div>
    );
  }

  if (missing) {
    return (
      <div className="task-state" role="status">
        <p>Задача не найдена</p>
      </div>
    );
  }

  return null;
}
