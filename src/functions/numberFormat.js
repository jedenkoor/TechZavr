export default function numberFormat(number) {
  return number ? new Intl.NumberFormat().format(number) : 0;
}