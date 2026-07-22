import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="text-center p-20">
            <h2 className="text-2xl font-bold mb-4">Nie znaleziono zadania</h2>
            <Link href="/" className="text-blue-500 hover:underline">
                Wróć na stronę główną
            </Link>
        </div>
    );
}