// src/pages/index.tsx
export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      {/* Test the purple color on this heading */}
      <h1 className="text-5xl md:text-7xl font-bold text-primary-purple mb-4 font-cinzel">
        Find The Perfect Gift
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Let our magical AI guide you to the best gift ideas.
      </p>
    </div>
  );
}