export function empty(...rest) {
  return rest.some((str) => str === '');
}

export const handlePromise = (promsise) => {
  return promsise
    .then((res) => res.json())
    .then((data) => [undefined, data])
    .catch((err) => [err, undefined]);
};
