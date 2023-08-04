import Big from 'big.js';

function handleArgs(...args) {
  return args.map((e) => {
    const mayBeNum = Number(e);
    return Number.isNaN(mayBeNum) ? 0 : mayBeNum;
  });
}

export function sum(...args) {
  console.log(args);
  const numList = handleArgs(args);
  console.log(numList);
  if (numList.length === 0) {
    return 0;
  }
  if (numList.length === 1) {
    return numList[0];
  }

  let res = new Big(numList[0]);

  // eslint-disable-next-line no-plusplus
  for (let index = 1; index < numList.length; index++) {
    console.log(numList[index]);
    res = res.plus(numList[index]);
  }

  return res.toNumber();
}
