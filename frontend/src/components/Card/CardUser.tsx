type CardUserProps = {
  image: string;
  name: string;
  role?: string;
};

export function CardUser({ image, name, role }: CardUserProps) {
  return (
    <div className="flex items-center gap-3 mt-auto">
      <img src={image} alt={name} className="w-10 h-10 rounded-full" />
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
          {name}
        </h4>
        {role && <p className="text-xs text-gray-500">{role}</p>}
      </div>
    </div>
  );
}
