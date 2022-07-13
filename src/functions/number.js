export const getEnglishLabel = number => {
  if (number < 0 || number > 999) {
    throw new Error('Supported range is from 0 to 999.');
  }

  const bases = [
    ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
    ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
    ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
  ];

  const resolveSingleDigit = number => bases[0][number];

  const resolveDoubleDigit = number => {
    if (number < 20) {
      return bases[1][number - 10];
    }

    const numberAsString = number.toString();

    const tenBase = bases[2][numberAsString[0] - 2];

    return numberAsString.endsWith('0') ?
      tenBase :
        `${tenBase}-${resolveSingleDigit(numberAsString[1])}`;
  };

  const resolveTripleDigit = number => {
    const numberAsString = number.toString();

    const hundredBase = `${bases[0][numberAsString[0]]} hundred`;

    if (numberAsString.endsWith('00')) {
      return hundredBase;
    }

    const suffix = numberAsString[1] === '0' ?
      resolveSingleDigit(numberAsString[2]) :
      resolveDoubleDigit(numberAsString.substring(1));

    return numberAsString.endsWith('00') ?
      hundredBase :
        `${hundredBase} ${suffix}`;
  };

  let targetFunction;

  switch (number.toString().length) {
    case 1:
      targetFunction = resolveSingleDigit;
      break;

    case 2:
      targetFunction = resolveDoubleDigit;
      break;

    case 3:
      targetFunction = resolveTripleDigit;
      break;

    default: return new Error(
      `Unable to determine English representation for ${number}.`
    );
  }

  return targetFunction(number);
};
