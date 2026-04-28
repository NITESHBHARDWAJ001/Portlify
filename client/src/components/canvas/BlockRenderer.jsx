import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import { useCanvasStore } from '../../store/canvasStore';
import { getComponent } from '../../utils/componentRegistry';
import { cn } from '../../utils/helpers';

export default function BlockRenderer({ component, isPreviewMode }) {
  const { deleteComponent, selectComponent, selectedComponent } = useCanvasStore();

  const Component = getComponent(component.type);

  if (!Component) {
    return (
      <div className="p-4 border-2 border-red-300 rounded bg-red-50 text-red-600">
        Unknown component type: {component.type}
      </div>
    );
  }

  const handleSelect = (e) => {
    if (!isPreviewMode) {
      e.stopPropagation();
      selectComponent(component);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteComponent(component.id);
  };

  const isSelected = selectedComponent?.id === component.id;

  return (
    <div
      onClick={handleSelect}
      className={cn(
        "relative component-wrapper",
        !isPreviewMode && "cursor-pointer hover:ring-2 hover:ring-blue-300",
        isSelected && !isPreviewMode && "component-selected"
      )}
    >
      {!isPreviewMode && isSelected && (
        <div className="absolute top-2 right-2 z-10 flex gap-2 bg-white rounded shadow-md">
          <button
            onClick={handleSelect}
            className="p-2 hover:bg-gray-100"
            title="Edit component"
          >
            <FiEdit2 />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 hover:bg-red-50 text-red-600"
            title="Delete component"
          >
            <FiTrash2 />
          </button>
        </div>
      )}

      <Component
        content={component.content}
        style={component.style}
        props={component.props}
        isEditing={!isPreviewMode}
      />
    </div>
  );
}
