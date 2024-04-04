export const promiseHandler = <T, U = Error>(
  promise: Promise<T>,
  onfinally?: (() => void) | null | undefined
) =>
  promise
    .then<readonly [T, null, true]>((result) => [result, null, true] as const)
    .catch<readonly [null, U, false]>((error) => [null, error, false] as const)
    .finally(onfinally);

export default function promiseHandler<T, U = Error>(
  promise: Promise<T>,
  onfinally?: (() => void) | null | undefined
) {
  return promise
    .then<readonly [T, null, true]>((result) => [result, null, true] as const)
    .catch<readonly [null, U, false]>((error) => [null, error, false] as const)
    .finally(onfinally);
}
