import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect } from "react";

type sortableItemProps = {
  id: number;
  option: { name: string; key: string };
};
export function SortableItem(props: sortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners} className="preference">
      {props.option.name}
    </li>
  );
}
