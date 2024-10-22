"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => {};
}) {
  return (
    <div>
      <h4>Error!!</h4>
      <button
        onClick={() => {
          reset();
        }}
      >
        새로고침
      </button>
    </div>
  );
}
