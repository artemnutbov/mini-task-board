import { addTaskAction } from '../lib/actions';

export default function TaskForm() {
    return (
        <form action={addTaskAction} className="border p-6 rounded-lg bg-gray-50 mb-8 space-y-4 shadow-sm">
            <h2 className="font-bold text-xl mb-2">Dodaj nowe zadanie</h2>

            <div>
                <label className="block text-sm font-medium mb-1">Tytuł</label>
                <input
                    name="title"
                    required
                    className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Opis</label>
                <textarea
                    name="description"
                    required
                    rows={3}
                    className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                    name="status"
                    className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="todo">Do zrobienia</option>
                    <option value="in-progress">W trakcie</option>
                    <option value="done">Zrobione</option>
                </select>
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
                Dodaj zadanie
            </button>
        </form>
    );
}