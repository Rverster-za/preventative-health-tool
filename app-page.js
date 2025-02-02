// app/page.js
import PreventativeHealthForm from '../components/PreventativeHealthForm';

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Preventative Health Recommendations
        </h1>
        <p className="mb-8 text-center text-gray-600">
          Enter patient details to see suggested health topics for discussion
        </p>
        <PreventativeHealthForm />
      </div>
    </main>
  );
}