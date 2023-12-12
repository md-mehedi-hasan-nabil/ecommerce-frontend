import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="text-center h-screen flex justify-center items-center">
      <div>
      <h1 className="font-medium text-2xl">Oops!</h1>
      <p className="text-xl">Sorry, an unexpected error has occurred.</p>
      <p className="font-bold">
        <i>{error.statusText || error.message}</i>
      </p>
      </div>
    </div>
  );
}
