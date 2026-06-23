export default function Icon({ name }: { name: string }) {
  return (
    <svg className="icon" aria-hidden="true">
      <use href={`/assets/icons/phosphor-sprite.svg#ph-${name}`}></use>
    </svg>
  );
}
