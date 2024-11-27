import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  // Check if the error is a response error
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.status}</i>
        </p>
      </div>
    );
  }

  // Handle other types of errors (fallback)
  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error instanceof Error ? error.message : "Unknown error"}</i>
      </p>
    </div>
  );
}
