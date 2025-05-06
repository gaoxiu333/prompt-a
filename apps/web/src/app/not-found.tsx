import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-lg">
        Sorry, the page you are looking for does not exist.
        <Link href="/" className="text-blue-500 hover:underline">
          Go back to the homepage
        </Link>
        .
      </p>
    </div>
  );
};

export default NotFoundPage;
