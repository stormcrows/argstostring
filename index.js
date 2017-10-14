module.exports = (...args) => {
  if (args.length === 0) {
    return "";
  }

  const head = args[0];
  const tail = args.slice(1);
  const ret = typeof head === "string" ? replacer(head, tail) : stringify(head);

  return tail.length === 0
    ? ret
    : ret + " " + tail.map(x => stringify(x)).join(" ");
};

const stringify = x => (typeof x === "object" ? JSON.stringify(x) : String(x));

const replacer = (str = "", args = []) =>
  str.replace(/%[sfidOoj]/g, T => (!args[0] ? T : convert(args.shift(), T)));

const convert = (x, T) => (conversions[T] ? conversions[T](x) : String(x));

const conversions = {
  "%i": x => parseInt(x, 10).toString(),
  "%f": x => Number(x).toString(),
  "%d": x => Number(x).toString(),
  "%O": x => stringify(x),
  "%o": x => stringify(x),
  "%j": x => stringify(x)
};
