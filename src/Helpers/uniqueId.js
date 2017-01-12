const r = () => (
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
);

export default () => (`${r()}${r()}${r()}${r()}`);
