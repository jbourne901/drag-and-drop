export default function noOp(e: Event) {
    e.stopPropagation();
    e.preventDefault();
}