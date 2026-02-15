import { CheckCircle2, Circle } from 'lucide-react';
import { Task } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { withInteractable, useTamboComponentState } from '@tambo-ai/react';
import { toggleTaskAction } from '@/lib/actions';

const EMPTY_TASKS: Task[] = [];

function TodoListBase({ tasks: tasksProp = EMPTY_TASKS }: { tasks?: Task[] }) {
  const [tasks, setTasks] = useTamboComponentState("tasks", tasksProp);

  const toggleTask = async (taskId: string) => {
    if (!tasks) return;
    const task = (tasks as Task[]).find(t => t.id === taskId);
    if (!task) return;

    const newCompleted = !task.completed;
    
    // Optimistic update
    const updatedTasks = (tasks as Task[]).map(t => 
      t.id === taskId ? { ...t, completed: newCompleted } : t
    );
    setTasks(updatedTasks);

    // Persist to DB
    await toggleTaskAction(taskId, newCompleted);
  };

  if (!tasks || (tasks as Task[]).length === 0) {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 text-center text-zinc-500">
            <p>No tasks found.</p>
        </div>
    );
  }
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800">
      <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Action Items</h3>
      <div className="space-y-3">
        {(tasks as Task[]).map((task) => (
          <div 
            key={task.id} 
            onClick={() => toggleTask(task.id)}
            className="flex items-center gap-3 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl transition-colors group cursor-pointer"
          >
            <div className="text-zinc-400 group-hover:text-emerald-500 transition-colors">
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </div>
            <span className={cn(
                "flex-1 text-sm font-medium text-zinc-700 dark:text-zinc-300",
                task.completed && "line-through opacity-50"
            )}>
              {task.title}
            </span>
            {task.priority === 'high' && (
                <span className="w-2 h-2 rounded-full bg-red-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export const TodoList = withInteractable(TodoListBase, {
  componentName: "TodoList",
  description: "A todo list where tasks can be toggled",
});
