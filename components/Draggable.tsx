import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";

function Draggable(props: {
  id: string;
  value: number | undefined;
  name: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex flex-col h-fit items-end ">
      <span className="text-sm px-2 ">{props.name}</span>
      <span className="text-lg font-bold px-2  self-start">{props.value}</span>
    </Button>
  );
}

export default Draggable;
