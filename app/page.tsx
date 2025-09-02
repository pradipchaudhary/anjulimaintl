export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-24 text-center">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">
        Welcome to Anjulima International Pvt Ltd
      </h1>

      {/* Button */}
      <a
        href="/dashboard"
        className="bg-primary hover:bg-secondary text-white font-medium px-6 py-3 rounded-lg shadow-md transition duration-200"
      >
        Go to Dashboard
      </a>
    </main>
  );
}
