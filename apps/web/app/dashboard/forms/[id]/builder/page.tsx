"use client";

import { useEffect, useState, useRef } from "react";
import type { ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import useFormBuilder from "~/hooks/useFormBuilder";
import { trpc } from "~/trpc/client";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  useDraggable,
  useDndContext,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ArrowLeft,
  Eye,
  Plus,
  GripVertical,
  Trash2,
  Type,
  Hash,
  AlignLeft,
  CheckSquare,
  List,
  Calendar,
  Mail,
  ChevronDown,
  Star,
  ToggleLeft,
  Settings,
  Palette,
  X,
  Copy,
  Layers,
  Sparkles,
  LayoutTemplate,
  Monitor,
  Zap,
  Share2,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Badge } from "~/components/ui/badge";

const PALETTE_DRAG_PREFIX = "palette:";
const CANVAS_DROP_ZONE_ID = "canvas-drop-zone";

// ─── Field Type Definitions ───────────────────────────────────────────────────
const FIELD_TYPES = [
  {
    type: "short_text",
    label: "Short Text",
    icon: Type,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    type: "long_text",
    label: "Long Text",
    icon: AlignLeft,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  { type: "email", label: "Email", icon: Mail, color: "text-green-400", bg: "bg-green-400/10" },
  { type: "number", label: "Number", icon: Hash, color: "text-orange-400", bg: "bg-orange-400/10" },
  {
    type: "single_select",
    label: "Single Select",
    icon: ChevronDown,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    type: "multi_select",
    label: "Multi Select",
    icon: CheckSquare,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
  {
    type: "dropdown",
    label: "Dropdown",
    icon: List,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    type: "checkbox",
    label: "Checkbox",
    icon: ToggleLeft,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  { type: "rating", label: "Rating", icon: Star, color: "text-amber-400", bg: "bg-amber-400/10" },
  { type: "date", label: "Date", icon: Calendar, color: "text-red-400", bg: "bg-red-400/10" },
];

// ─── Theme Definitions ────────────────────────────────────────────────────────
const THEMES = [
  {
    id: "apple-glass",
    name: "Apple Glass",
    description: "Frosted glass minimal",
    preview: {
      bg: "bg-white/10 backdrop-blur",
      accent: "#6366f1",
      text: "#1e1e2e",
      border: "border-white/30",
    },
    gradient: "from-slate-100 to-white",
    textColor: "text-slate-800",
    accentColor: "bg-indigo-500",
    icon: "🍎",
  },
  {
    id: "money-heist",
    name: "Money Heist",
    description: "Bold crimson on dark",
    preview: { bg: "bg-black", accent: "#dc2626", text: "#ffffff", border: "border-red-500/50" },
    gradient: "from-red-950 to-black",
    textColor: "text-white",
    accentColor: "bg-red-600",
    icon: "💰",
  },
  {
    id: "hacker-mode",
    name: "Hacker Mode",
    description: "Terminal green on black",
    preview: { bg: "bg-black", accent: "#22c55e", text: "#22c55e", border: "border-green-500/50" },
    gradient: "from-green-950 to-black",
    textColor: "text-green-400",
    accentColor: "bg-green-600",
    icon: "💻",
  },
  {
    id: "anime-neon",
    name: "Anime Neon",
    description: "Purple & pink neon",
    preview: {
      bg: "bg-violet-950",
      accent: "#a855f7",
      text: "#f0abfc",
      border: "border-purple-500/50",
    },
    gradient: "from-purple-950 via-violet-900 to-fuchsia-950",
    textColor: "text-purple-200",
    accentColor: "bg-purple-600",
    icon: "✨",
  },
  {
    id: "startup-minimal",
    name: "Startup Minimal",
    description: "Clean white modern",
    preview: { bg: "bg-gray-50", accent: "#0f172a", text: "#0f172a", border: "border-gray-200" },
    gradient: "from-gray-50 to-white",
    textColor: "text-gray-900",
    accentColor: "bg-slate-900",
    icon: "🚀",
  },
];

// ─── Theme Preview Renderer ────────────────────────────────────────────────────
function getThemeStyles(themeId: string) {
  switch (themeId) {
    case "money-heist":
      return {
        wrapper: "bg-black text-white",
        card: "bg-zinc-900 border border-red-900/50",
        input: "bg-zinc-800 border-red-900/50 text-white placeholder:text-zinc-500",
        label: "text-red-400 font-mono uppercase text-xs tracking-wider",
        button: "bg-red-600 hover:bg-red-700 text-white",
        title: "text-white font-bold",
        desc: "text-zinc-400",
        accent: "text-red-400",
        star: "text-red-500",
        check: "border-red-700 checked:bg-red-600",
      };
    case "hacker-mode":
      return {
        wrapper: "bg-black text-green-400 font-mono",
        card: "bg-zinc-950 border border-green-900/60",
        input: "bg-black border-green-800 text-green-400 placeholder:text-green-900 font-mono",
        label: "text-green-500 uppercase text-xs tracking-widest",
        button: "bg-green-700 hover:bg-green-600 text-black font-mono font-bold",
        title: "text-green-400 font-mono",
        desc: "text-green-700",
        accent: "text-green-500",
        star: "text-green-500",
        check: "border-green-700",
      };
    case "anime-neon":
      return {
        wrapper: "bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-950 text-purple-100",
        card: "bg-purple-950/60 backdrop-blur border border-purple-500/30",
        input:
          "bg-purple-900/50 border-purple-500/50 text-purple-100 placeholder:text-purple-400/50",
        label: "text-pink-400 text-sm font-medium",
        button:
          "bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white",
        title:
          "text-white font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent",
        desc: "text-purple-300/70",
        accent: "text-fuchsia-400",
        star: "text-fuchsia-400",
        check: "border-purple-500",
      };
    case "startup-minimal":
      return {
        wrapper: "bg-white text-gray-900",
        card: "bg-white border border-gray-200 shadow-sm",
        input: "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400",
        label: "text-gray-700 font-medium text-sm",
        button: "bg-gray-900 hover:bg-gray-800 text-white",
        title: "text-gray-900 font-bold",
        desc: "text-gray-500",
        accent: "text-gray-900",
        star: "text-gray-800",
        check: "border-gray-400",
      };
    default: // apple-glass
      return {
        wrapper: "bg-gradient-to-br from-slate-100 to-white text-slate-800",
        card: "bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl shadow-black/5",
        input: "bg-white/80 border-slate-200 text-slate-800 placeholder:text-slate-400",
        label: "text-slate-600 text-sm font-medium",
        button: "bg-indigo-600 hover:bg-indigo-700 text-white",
        title: "text-slate-900 font-bold",
        desc: "text-slate-500",
        accent: "text-indigo-600",
        star: "text-indigo-500",
        check: "border-slate-300",
      };
  }
}

// ─── Preview Field Renderer ────────────────────────────────────────────────────
function PreviewField({ field, themeId }: { field: any; themeId: string }) {
  const s = getThemeStyles(themeId);
  const options: string[] = Array.isArray(field.options) ? field.options : [];

  return (
    <div className="space-y-2">
      <label className={`block ${s.label}`}>
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {field.helperText && <p className={`text-xs ${s.desc}`}>{field.helperText}</p>}

      {(field.type === "short_text" || field.type === "email" || field.type === "number") && (
        <input
          type={field.type === "email" ? "email" : field.type === "number" ? "number" : "text"}
          placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}...`}
          className={`w-full px-3 py-2 rounded-lg border text-sm outline-none ${s.input}`}
          readOnly
        />
      )}
      {field.type === "long_text" && (
        <textarea
          placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}...`}
          rows={3}
          className={`w-full px-3 py-2 rounded-lg border text-sm outline-none resize-none ${s.input}`}
          readOnly
        />
      )}
      {field.type === "date" && (
        <input
          type="date"
          className={`w-full px-3 py-2 rounded-lg border text-sm outline-none ${s.input}`}
          readOnly
        />
      )}
      {field.type === "single_select" && (
        <div className="flex flex-wrap gap-2">
          {options.length > 0 ? (
            options.map((opt: string) => (
              <button key={opt} className={`px-3 py-1.5 rounded-full border text-sm ${s.input}`}>
                {opt}
              </button>
            ))
          ) : (
            <span className={`text-sm ${s.desc}`}>No options defined</span>
          )}
        </div>
      )}
      {field.type === "multi_select" && (
        <div className="flex flex-wrap gap-2">
          {options.length > 0 ? (
            options.map((opt: string) => (
              <button key={opt} className={`px-3 py-1.5 rounded-full border text-sm ${s.input}`}>
                {opt}
              </button>
            ))
          ) : (
            <span className={`text-sm ${s.desc}`}>No options defined</span>
          )}
        </div>
      )}
      {field.type === "dropdown" && (
        <select className={`w-full px-3 py-2 rounded-lg border text-sm outline-none ${s.input}`}>
          <option value="">Select an option...</option>
          {options.map((opt: string) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      )}
      {field.type === "checkbox" && (
        <div className="space-y-2">
          {options.length > 0 ? (
            options.map((opt: string) => (
              <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" className={`rounded border ${s.check}`} readOnly />
                <span>{opt}</span>
              </label>
            ))
          ) : (
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className={`rounded border ${s.check}`} readOnly />
              <span>{field.label}</span>
            </label>
          )}
        </div>
      )}
      {field.type === "rating" && (
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className={`w-6 h-6 ${s.star} fill-current`} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Sortable Field Card ──────────────────────────────────────────────────────
function SortableFieldItem({
  field,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
  isPublished,
}: {
  field: any;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  isPublished?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: field.id,
  });
  const ft = FIELD_TYPES.find((f) => f.type === field.type);
  const Icon = ft?.icon ?? Type;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(field.id);
      }}
      className={`relative group rounded-xl border p-4 cursor-pointer transition-all duration-150
        ${
          isSelected
            ? "border-red-500/60 bg-red-500/5 shadow-[0_0_0_1px_rgba(239,68,68,0.3)]"
            : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
        }
        ${isDragging ? "shadow-2xl" : ""}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Drag handle */}
        {!isPublished && (
          <div
            {...attributes}
            {...listeners}
            onClick={(e) => e.stopPropagation()}
            className="mt-0.5 p-1 rounded cursor-grab active:cursor-grabbing text-white/30 hover:text-white/60 hover:bg-white/10 transition-colors"
          >
            <GripVertical className="w-4 h-4" />
          </div>
        )}

        {/* Field icon */}
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${ft?.bg ?? "bg-white/10"}`}
        >
          <Icon className={`w-4 h-4 ${ft?.color ?? "text-white/60"}`} />
        </div>

        {/* Field info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className={`text-xs font-medium uppercase tracking-wider ${ft?.color ?? "text-white/50"}`}
            >
              {ft?.label ?? field.type}
            </span>
            {field.required && <span className="text-red-400 text-xs font-bold">*Required</span>}
          </div>
          <h3 className="font-semibold text-white text-sm truncate">{field.label}</h3>
          {field.helperText && (
            <p className="text-xs text-white/40 truncate mt-0.5">{field.helperText}</p>
          )}
        </div>

        {/* Actions */}
        {!isPublished && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate(field.id);
              }}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white/80 transition-colors"
            title="Duplicate field"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(field.id);
            }}
            className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors"
            title="Delete field"
          >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
      {isSelected && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-red-500 rounded-r-full" />
      )}
    </div>
  );
}

function PaletteFieldButton({
  fieldType,
  onAdd,
  disabled,
}: {
  fieldType: (typeof FIELD_TYPES)[number];
  onAdd: (type: string) => void;
  disabled: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `${PALETTE_DRAG_PREFIX}${fieldType.type}`,
    data: {
      kind: "palette-field",
      type: fieldType.type,
    },
    disabled,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.55 : 1,
  };

  return (
    <motion.button
      ref={setNodeRef}
      style={style}
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onAdd(fieldType.type)}
      disabled={disabled}
      className="w-full group flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/8 transition-all text-left touch-none disabled:opacity-60"
      {...listeners}
      {...attributes}
    >
      <div
        className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${fieldType.bg} transition-colors`}
      >
        <fieldType.icon className={`w-3.5 h-3.5 ${fieldType.color}`} />
      </div>
      <span className="text-xs font-medium text-white/70 group-hover:text-white/90 transition-colors">
        {fieldType.label}
      </span>
      <Plus className="w-3 h-3 ml-auto text-white/20 group-hover:text-white/50 transition-colors" />
    </motion.button>
  );
}

function CanvasDropArea({ children, isEmpty }: { children: ReactNode; isEmpty: boolean }) {
  const { setNodeRef, isOver } = useDroppable({
    id: CANVAS_DROP_ZONE_ID,
  });
  const { active } = useDndContext();
  const isDraggingPaletteField = active?.data.current?.kind === "palette-field";

  return (
    <div
      ref={setNodeRef}
      className={`relative rounded-2xl border-2 border-dashed p-2 transition-all duration-150 ${
        isOver
          ? "border-red-400/70 bg-red-500/10 shadow-[0_0_40px_rgba(239,68,68,0.16)]"
          : isDraggingPaletteField
            ? "border-red-500/30 bg-red-500/[0.04]"
            : "border-transparent"
      }`}
    >
      {isDraggingPaletteField && (
        <div
          className={`pointer-events-none absolute inset-x-4 -top-3 z-10 flex justify-center transition-opacity ${
            isOver ? "opacity-100" : "opacity-70"
          }`}
        >
          <span className="rounded-full border border-red-400/40 bg-black px-3 py-1 text-[11px] font-medium text-red-100 shadow-lg">
            Drop field here
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

// ─── Options Editor ───────────────────────────────────────────────────────────
function OptionsEditor({
  options,
  onChange,
}: {
  options: string[];
  onChange: (opts: string[]) => void;
}) {
  const [input, setInput] = useState("");
  const add = () => {
    const val = input.trim();
    if (val && !options.includes(val)) {
      onChange([...options, val]);
      setInput("");
    }
  };
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5 min-h-[32px]">
        {options.map((opt) => (
          <span
            key={opt}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-xs text-white/80"
          >
            {opt}
            <button
              onClick={() => onChange(options.filter((o) => o !== opt))}
              className="ml-0.5 hover:text-red-400 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Add option..."
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm h-8"
        />
        <Button
          size="sm"
          onClick={add}
          className="bg-white/10 hover:bg-white/20 text-white border-0 h-8 px-3"
        >
          <Plus className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function FormBuilderPage() {
  const params = useParams();
  const router = useRouter();
  const formId = params.id as string;

  const { data: form, isLoading } = trpc.form.getFormById.useQuery({ id: formId });

  const {
    addFieldMutation,
    deleteFieldMutation,
    reorderFieldsMutation,
    updateFieldMutation,
    updateFormMutation,
  } = useFormBuilder(formId);

  const [fields, setFields] = useState<any[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [rightTab, setRightTab] = useState<"properties" | "theme">("properties");

  const isPublished = form?.status === "published";

  useEffect(() => {
    if (isPublished) {
      setRightTab("theme");
    }
  }, [isPublished]);

  // Local edits for the selected field (debounced save)
  const [localField, setLocalField] = useState<any>(null);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (form?.fields) setFields(form.fields as any[]);
  }, [form]);

  const selectedField = fields.find((f) => f.id === selectedFieldId) ?? null;

  useEffect(() => {
    if (selectedField) setLocalField({ ...selectedField });
    else setLocalField(null);
  }, [selectedFieldId, fields]);

  // Auto-save local field edits
  const saveFieldEdit = (patch: Partial<any>) => {
    if (!selectedFieldId) return;
    const updated = { ...localField, ...patch };
    setLocalField(updated);
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      updateFieldMutation.mutate({
        fieldId: selectedFieldId,
        label: updated.label,
        placeholder: updated.placeholder ?? undefined,
        helperText: updated.helperText ?? undefined,
        required: updated.required,
        options: updated.options ?? undefined,
        validations: updated.validations ?? undefined,
      });
    }, 600);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    if (isPublished) return;
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over || isPublished) return;

    const paletteType = active.data.current?.type as string | undefined;
    const isPaletteField = active.data.current?.kind === "palette-field";

    if (isPaletteField && paletteType) {
      const ft = FIELD_TYPES.find((f) => f.type === paletteType);
      const targetIndex = fields.findIndex((i) => i.id === over.id);
      let insertIndex = fields.length;

      if (targetIndex >= 0) {
        const activeRect = active.rect.current.translated ?? active.rect.current.initial;
        if (activeRect) {
          const activeCenter = activeRect.top + activeRect.height / 2;
          const overCenter = over.rect.top + over.rect.height / 2;
          insertIndex = targetIndex + (activeCenter > overCenter ? 1 : 0);
        } else {
          insertIndex = targetIndex;
        }
      }

      try {
        const result = await addFieldMutation.mutateAsync({
          formId,
          type: paletteType as any,
          label: `New ${ft?.label ?? paletteType}`,
        });

        if (!result.field) return;

        const nextFields = [...fields];
        nextFields.splice(insertIndex, 0, result.field);
        setFields(nextFields);
        setSelectedFieldId(result.field.id);
        setRightTab("properties");
        reorderFieldsMutation.mutate({ formId, fieldIds: nextFields.map((f) => f.id) });
      } catch {
        // The mutation hook already shows the user-facing error toast.
      }
      return;
    }

    if (active.id !== over.id) {
      setFields((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        if (oldIndex < 0 || newIndex < 0) return items;
        const newArr = arrayMove(items, oldIndex, newIndex);
        reorderFieldsMutation.mutate({ formId, fieldIds: newArr.map((f) => f.id) });
        return newArr;
      });
    }
  };

  const handleAddField = (type: string) => {
    const ft = FIELD_TYPES.find((f) => f.type === type);
    addFieldMutation.mutate({
      formId,
      type: type as any,
      label: `New ${ft?.label ?? type}`,
    });
  };

  const handleDelete = (fieldId: string) => {
    if (selectedFieldId === fieldId) setSelectedFieldId(null);
    deleteFieldMutation.mutate({ fieldId });
  };

  const handleDuplicate = (fieldId: string) => {
    const field = fields.find((f) => f.id === fieldId);
    if (!field) return;
    addFieldMutation.mutate({
      formId,
      type: field.type,
      label: `${field.label} (copy)`,
      placeholder: field.placeholder ?? undefined,
      helperText: field.helperText ?? undefined,
      required: field.required ?? false,
      options: field.options ?? undefined,
    });
  };

  const handleThemeChange = (themeId: string) => {
    updateFormMutation.mutate({ formId, theme: themeId as any });
  };

  const currentTheme = THEMES.find((t) => t.id === (form?.theme ?? "apple-glass")) ?? THEMES[0]!;

  const handleShare = () => {
    if (form?.slug) {
      const url = `${window.location.origin}/f/${form.slug}`;
      navigator.clipboard.writeText(url);
      toast.success("Public link copied to clipboard!");
    } else {
      toast.error("Form doesn't have a slug yet.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-white/40 text-sm">Loading builder...</p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <p className="text-red-400">Form not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0a0a0a] text-white">
      {/* ── Header ── */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-white/8 bg-black/60 backdrop-blur-xl z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-white/8 h-8 w-8">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="w-px h-5 bg-white/10" />
          <div>
            <h1 className="text-sm font-semibold text-white leading-none">{form.title}</h1>
            <p className="text-xs text-white/40 mt-0.5">Form Builder</p>
          </div>
          <Badge
            variant="outline"
            className={`text-xs border ml-1 ${
              form.status === "published"
                ? "border-green-500/40 text-green-400 bg-green-500/10"
                : "border-white/10 text-white/40"
            }`}
          >
            {form.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs h-8 gap-2"
          >
            <Link href={`/dashboard/forms/${formId}/responses`}>
              <List className="w-3.5 h-3.5" />
              Responses
            </Link>
          </Button>
          {form.status === "published" && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs h-8 gap-2"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewOpen(true)}
            className="border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs h-8 gap-2"
          >
            <Eye className="w-3.5 h-3.5" />
            Preview
          </Button>
          <Button
            size="sm"
            onClick={() => updateFormMutation.mutate({ formId, status: "published" })}
            disabled={updateFormMutation.isPending}
            className="bg-red-600 hover:bg-red-700 text-white text-xs h-8 gap-2"
          >
            <Zap className="w-3.5 h-3.5" />
            Publish
          </Button>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter} 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <div className="flex flex-1 overflow-hidden">
          {/* ── Left Panel — Field Palette ── */}
          {!isPublished && (
            <aside className="w-56 flex-shrink-0 border-r border-white/8 bg-black/40 flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-white/8">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/35 flex items-center gap-1.5">
                <Layers className="w-3 h-3" /> Fields
              </p>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
              {FIELD_TYPES.map((ft) => (
                <PaletteFieldButton
                  key={ft.type}
                  fieldType={ft}
                  onAdd={handleAddField}
                  disabled={addFieldMutation.isPending}
                />
              ))}
            </div>
            {/* Field count */}
            <div className="px-4 py-3 border-t border-white/8">
              <p className="text-xs text-white/30 text-center">
                {fields.length} field{fields.length !== 1 ? "s" : ""}
              </p>
            </div>
          </aside>
          )}

          {/* ── Center — Canvas ── */}
          <main
            className="flex-1 overflow-y-auto bg-[#0d0d0d]"
            onClick={() => setSelectedFieldId(null)}
          >
            {/* Form header preview */}
            <div className="max-w-2xl mx-auto pt-10 px-6 pb-4">
              <div className="mb-8 px-1">
                <h2 className="text-2xl font-bold text-white">{form.title}</h2>
                {form.description && (
                  <p className="text-white/50 text-sm mt-1.5">{form.description}</p>
                )}
              </div>

              <CanvasDropArea isEmpty={fields.length === 0}>
                {fields.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-2 border-dashed border-white/10 rounded-2xl p-14 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                      <LayoutTemplate className="w-6 h-6 text-white/30" />
                    </div>
                    <h3 className="text-base font-semibold text-white/60 mb-1">No fields yet</h3>
                    <p className="text-sm text-white/30 max-w-xs">
                      Click any field type from the left panel to add it here
                    </p>
                  </motion.div>
                ) : (
                  <SortableContext
                    items={fields.map((f) => f.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <AnimatePresence>
                      <div className="space-y-2.5">
                        {fields.map((field) => (
                          <motion.div
                            key={field.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                          >
                            <SortableFieldItem
                              field={field}
                              isSelected={selectedFieldId === field.id}
                              onSelect={(id) => {
                                setSelectedFieldId(id);
                                if (!isPublished) setRightTab("properties");
                              }}
                              onDelete={handleDelete}
                              onDuplicate={handleDuplicate}
                              isPublished={isPublished}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </AnimatePresence>
                  </SortableContext>
                )}
              </CanvasDropArea>

              {/* Add more button at bottom of canvas */}
              {fields.length > 0 && !isPublished && (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddField("short_text");
                    }}
                    className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors py-3"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add field
                  </button>
                </div>
              )}
            </div>
          </main>

          {/* ── Right Panel — Properties / Theme ── */}
          <aside className="w-72 flex-shrink-0 border-l border-white/8 bg-black/40 flex flex-col overflow-hidden">
            <Tabs
              value={rightTab}
              onValueChange={(v) => setRightTab(v as any)}
              className="flex flex-col h-full"
            >
              <div className="flex-shrink-0 border-b border-white/8 px-2 pt-2">
                <TabsList className="w-full bg-white/5 rounded-lg h-8">
                  {!isPublished && (
                    <TabsTrigger
                      value="properties"
                      className="flex-1 text-xs data-[state=active]:bg-white/15 data-[state=active]:text-white text-white/50 rounded-md h-6 gap-1.5"
                    >
                      <Settings className="w-3 h-3" />
                      Properties
                    </TabsTrigger>
                  )}
                  <TabsTrigger
                    value="theme"
                    className="flex-1 text-xs data-[state=active]:bg-white/15 data-[state=active]:text-white text-white/50 rounded-md h-6 gap-1.5"
                  >
                    <Palette className="w-3 h-3" />
                    Theme
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Properties Tab */}
              <TabsContent value="properties" className="flex-1 overflow-y-auto m-0">
                {localField ? (
                  <motion.div
                    key={localField.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 space-y-4"
                  >
                    {/* Field type badge */}
                    <div className="flex items-center gap-2">
                      {(() => {
                        const ft = FIELD_TYPES.find((f) => f.type === localField.type);
                        const Icon = ft?.icon ?? Type;
                        return (
                          <>
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center ${ft?.bg ?? "bg-white/10"}`}
                            >
                              <Icon className={`w-3.5 h-3.5 ${ft?.color ?? "text-white/60"}`} />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-white/80">
                                {ft?.label ?? localField.type}
                              </p>
                              <p className="text-xs text-white/30">Field Properties</p>
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    <div className="w-full h-px bg-white/8" />

                    {/* Label */}
                    <div className="space-y-1.5">
                      <Label className="text-xs text-white/50 uppercase tracking-wider">
                        Label
                      </Label>
                      <Input
                        value={localField.label ?? ""}
                        onChange={(e) => saveFieldEdit({ label: e.target.value })}
                        className="bg-white/5 border-white/10 text-white text-sm h-8 focus:border-red-500/50"
                        placeholder="Field label..."
                      />
                    </div>

                    {/* Placeholder (not for checkbox/rating) */}
                    {!["checkbox", "rating", "single_select", "multi_select"].includes(
                      localField.type,
                    ) && (
                      <div className="space-y-1.5">
                        <Label className="text-xs text-white/50 uppercase tracking-wider">
                          Placeholder
                        </Label>
                        <Input
                          value={localField.placeholder ?? ""}
                          onChange={(e) => saveFieldEdit({ placeholder: e.target.value })}
                          className="bg-white/5 border-white/10 text-white text-sm h-8 focus:border-red-500/50"
                          placeholder="Placeholder text..."
                        />
                      </div>
                    )}

                    {/* Helper Text */}
                    <div className="space-y-1.5">
                      <Label className="text-xs text-white/50 uppercase tracking-wider">
                        Helper Text
                      </Label>
                      <Textarea
                        value={localField.helperText ?? ""}
                        onChange={(e) => saveFieldEdit({ helperText: e.target.value })}
                        className="bg-white/5 border-white/10 text-white text-sm min-h-[56px] resize-none focus:border-red-500/50"
                        placeholder="Helper or description text..."
                      />
                    </div>

                    {/* Required Toggle */}
                    <div className="flex items-center justify-between py-1">
                      <div>
                        <p className="text-xs font-medium text-white/70">Required</p>
                        <p className="text-xs text-white/30">User must fill this field</p>
                      </div>
                      <Switch
                        checked={localField.required ?? false}
                        onCheckedChange={(v) => saveFieldEdit({ required: v })}
                        className="data-[state=checked]:bg-red-600"
                      />
                    </div>

                    {/* Options (for select/dropdown/checkbox) */}
                    {["single_select", "multi_select", "dropdown", "checkbox"].includes(
                      localField.type,
                    ) && (
                      <div className="space-y-1.5">
                        <Label className="text-xs text-white/50 uppercase tracking-wider">
                          Options
                        </Label>
                        <OptionsEditor
                          options={Array.isArray(localField.options) ? localField.options : []}
                          onChange={(opts) => saveFieldEdit({ options: opts })}
                        />
                      </div>
                    )}

                    {/* Number validations */}
                    {localField.type === "number" && (
                      <div className="space-y-3">
                        <Label className="text-xs text-white/50 uppercase tracking-wider">
                          Validations
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <p className="text-xs text-white/40">Min</p>
                            <Input
                              type="number"
                              value={localField.validations?.min ?? ""}
                              onChange={(e) =>
                                saveFieldEdit({
                                  validations: { ...localField.validations, min: e.target.value },
                                })
                              }
                              className="bg-white/5 border-white/10 text-white text-xs h-7"
                              placeholder="0"
                            />
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-white/40">Max</p>
                            <Input
                              type="number"
                              value={localField.validations?.max ?? ""}
                              onChange={(e) =>
                                saveFieldEdit({
                                  validations: { ...localField.validations, max: e.target.value },
                                })
                              }
                              className="bg-white/5 border-white/10 text-white text-xs h-7"
                              placeholder="100"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Text validations */}
                    {["short_text", "long_text"].includes(localField.type) && (
                      <div className="space-y-3">
                        <Label className="text-xs text-white/50 uppercase tracking-wider">
                          Validations
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <p className="text-xs text-white/40">Min Length</p>
                            <Input
                              type="number"
                              value={localField.validations?.minLength ?? ""}
                              onChange={(e) =>
                                saveFieldEdit({
                                  validations: {
                                    ...localField.validations,
                                    minLength: e.target.value,
                                  },
                                })
                              }
                              className="bg-white/5 border-white/10 text-white text-xs h-7"
                              placeholder="0"
                            />
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-white/40">Max Length</p>
                            <Input
                              type="number"
                              value={localField.validations?.maxLength ?? ""}
                              onChange={(e) =>
                                saveFieldEdit({
                                  validations: {
                                    ...localField.validations,
                                    maxLength: e.target.value,
                                  },
                                })
                              }
                              className="bg-white/5 border-white/10 text-white text-xs h-7"
                              placeholder="500"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Danger zone */}
                    <div className="pt-2 border-t border-white/8">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(localField.id)}
                        className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs h-8 gap-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete Field
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  /* Empty state — no field selected */
                  <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                      <Settings className="w-5 h-5 text-white/20" />
                    </div>
                    <p className="text-sm font-medium text-white/40 mb-1">No field selected</p>
                    <p className="text-xs text-white/20 leading-relaxed">
                      Click any field on the canvas to edit its properties here
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Theme Tab */}
              <TabsContent value="theme" className="flex-1 overflow-y-auto m-0 p-4">
                <div className="space-y-3">
                  <div className="space-y-0.5 mb-4">
                    <p className="text-xs font-semibold text-white/70">Form Theme</p>
                    <p className="text-xs text-white/30">
                      Choose how your form looks to respondents
                    </p>
                  </div>

                  {THEMES.map((theme) => {
                    const isActive = (form?.theme ?? "apple-glass") === theme.id;
                    return (
                      <motion.button
                        key={theme.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleThemeChange(theme.id)}
                        className={`w-full text-left rounded-xl border overflow-hidden transition-all ${
                          isActive
                            ? "border-red-500/60 shadow-[0_0_0_1px_rgba(239,68,68,0.2)]"
                            : "border-white/8 hover:border-white/20"
                        }`}
                      >
                        {/* Theme preview swatch */}
                        <div
                          className={`h-14 bg-gradient-to-br ${theme.gradient} flex items-center justify-center relative overflow-hidden`}
                        >
                          <span className="text-2xl">{theme.icon}</span>
                          {/* Mini form preview */}
                          <div className="absolute right-3 top-2 bottom-2 w-16 rounded-md overflow-hidden opacity-70">
                            <div className={`h-full flex flex-col gap-1 p-1.5 ${theme.gradient}`}>
                              <div
                                className={`h-1.5 w-10 rounded-full ${theme.accentColor} opacity-80`}
                              />
                              <div className="h-3 w-full rounded-sm border border-white/20 bg-white/10" />
                              <div className="h-3 w-full rounded-sm border border-white/20 bg-white/10" />
                            </div>
                          </div>
                        </div>
                        {/* Theme info */}
                        <div className="px-3 py-2 bg-white/3 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold text-white/80">{theme.name}</p>
                            <p className="text-xs text-white/30">{theme.description}</p>
                          </div>
                          {isActive && (
                            <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </aside>
        </div>

        {/* ── Drag Overlay ── */}
        <DragOverlay dropAnimation={{ duration: 250, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' }}>
          {activeId ? (
            activeId.toString().startsWith(PALETTE_DRAG_PREFIX) ? (
              (() => {
                const type = activeId.toString().replace(PALETTE_DRAG_PREFIX, "");
                const ft = FIELD_TYPES.find((f) => f.type === type);
                if (!ft) return null;
                return (
                  <div className="w-full max-w-[200px] flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#2a2a2a]/90 backdrop-blur-md border border-white/20 shadow-2xl opacity-90 scale-105">
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${ft.bg}`}>
                      <ft.icon className={`w-3.5 h-3.5 ${ft.color}`} />
                    </div>
                    <span className="text-xs font-medium text-white/90">{ft.label}</span>
                  </div>
                );
              })()
            ) : (
              (() => {
                const field = fields.find((f) => f.id === activeId);
                if (!field) return null;
                return (
                  <div className="opacity-90 scale-105 w-full">
                    <SortableFieldItem
                      field={field}
                      isSelected={false}
                      onSelect={() => {}}
                      onDelete={() => {}}
                      onDuplicate={() => {}}
                    />
                  </div>
                );
              })()
            )
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* ── Preview Dialog ── */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl w-full max-h-[90vh] p-0 overflow-hidden bg-zinc-950 border-white/10">
          {/* Dialog Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/40 flex-shrink-0">
            <div className="flex items-center gap-3">
              <DialogHeader>
                <DialogTitle className="text-sm font-semibold text-white">Form Preview</DialogTitle>
              </DialogHeader>
              <Badge variant="outline" className="text-xs border-white/10 text-white/40">
                {currentTheme.name}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-white/30" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPreviewOpen(false)}
                className="h-7 w-7 hover:bg-white/10 text-white/50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Preview content */}
          <div
            className={`overflow-y-auto max-h-[calc(90vh-56px)] ${getThemeStyles(form?.theme ?? "apple-glass").wrapper}`}
          >
            <div className="max-w-lg mx-auto p-8">
              {/* Form header */}
              <div className="mb-8">
                <h1
                  className={`text-2xl font-bold mb-2 ${getThemeStyles(form?.theme ?? "apple-glass").title}`}
                >
                  {form.title}
                </h1>
                {form.description && (
                  <p className={`text-sm ${getThemeStyles(form?.theme ?? "apple-glass").desc}`}>
                    {form.description}
                  </p>
                )}
              </div>

              {fields.length === 0 ? (
                <div
                  className={`text-center py-12 ${getThemeStyles(form?.theme ?? "apple-glass").desc}`}
                >
                  <Sparkles className="w-8 h-8 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">No fields added yet</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {fields.map((field) => (
                    <div
                      key={field.id}
                      className={`p-5 rounded-xl ${getThemeStyles(form?.theme ?? "apple-glass").card}`}
                    >
                      <PreviewField field={field} themeId={form?.theme ?? "apple-glass"} />
                    </div>
                  ))}

                  {/* Submit button */}
                  <button
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${getThemeStyles(form?.theme ?? "apple-glass").button}`}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
