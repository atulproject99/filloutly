"use client";

import { motion } from "framer-motion";
import { Copy, Plus, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { trpc } from "~/trpc/client";
import { toast } from "sonner";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import { useState } from "react";

const templates = [
  {
    id: "contact",
    title: "Contact Form",
    description: "A simple contact form to receive inquiries from your website visitors.",
    theme: "apple-glass",
    icon: "✉️",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    fields: [
      { type: "short_text", label: "Full Name", required: true, placeholder: "Jane Doe" },
      { type: "email", label: "Email Address", required: true, placeholder: "jane@example.com" },
      { type: "long_text", label: "Your Message", required: true, placeholder: "How can we help you?" }
    ]
  },
  {
    id: "feedback",
    title: "Customer Feedback",
    description: "Gather valuable insights from your customers about their experience.",
    theme: "startup-minimal",
    icon: "💬",
    color: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30",
    fields: [
      { type: "rating", label: "How would you rate your experience?", required: true },
      { type: "single_select", label: "What did you like the most?", options: ["Features", "Pricing", "Support", "Ease of Use"], required: false },
      { type: "long_text", label: "Any other suggestions?", placeholder: "Tell us how we can improve...", required: false }
    ]
  },
  {
    id: "event",
    title: "Event Registration",
    description: "Collect RSVPs and dietary requirements for your upcoming event.",
    theme: "anime-neon",
    icon: "🎟️",
    color: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/30",
    fields: [
      { type: "short_text", label: "Attendee Name", required: true },
      { type: "email", label: "Email Address", required: true },
      { type: "dropdown", label: "Will you be attending?", required: true, options: ["Yes, I'll be there!", "No, I can't make it."] },
      { type: "short_text", label: "Dietary Requirements", placeholder: "Vegetarian, Vegan, Gluten-free, etc.", required: false }
    ]
  },
  {
    id: "job",
    title: "Job Application",
    description: "Standardize your hiring process with a structured application form.",
    theme: "money-heist",
    icon: "💼",
    color: "from-red-500/20 to-orange-500/20",
    border: "border-red-500/30",
    fields: [
      { type: "short_text", label: "Full Name", required: true },
      { type: "email", label: "Email Address", required: true },
      { type: "short_text", label: "LinkedIn Profile URL", required: false },
      { type: "long_text", label: "Why do you want to join us?", required: true },
      { type: "long_text", label: "Describe a challenging project you worked on.", required: true }
    ]
  }
];

export default function TemplatesPage() {
  const router = useRouter();
  const [creatingId, setCreatingId] = useState<string | null>(null);

  const createMutation = trpc.form.createForm.useMutation();
  const addFieldMutation = trpc.form.addField.useMutation();

  const handleUseTemplate = async (template: typeof templates[0]) => {
    setCreatingId(template.id);
    const uniqueSlug = slugify(`${template.title}-${Math.floor(Math.random() * 10000)}`, { lower: true, strict: true });
    
    try {
      const formRes = await createMutation.mutateAsync({
        title: template.title,
        description: template.description,
        slug: uniqueSlug,
        theme: template.theme,
      });

      const formId = formRes.id;

      // Inject preset fields
      for (const field of template.fields) {
        await addFieldMutation.mutateAsync({
          formId,
          type: field.type as any,
          label: field.label,
          required: field.required,
          placeholder: field.placeholder,
          options: field.options,
        });
      }

      toast.success("Template instantiated successfully with fields!");
      router.push(`/dashboard/forms/${formId}/builder`);
    } catch (err: any) {
      toast.error(err.message || "Failed to use template.");
      setCreatingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight"
        >
          Form Templates
        </motion.h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${template.color} border ${template.border} rounded-3xl p-8 flex flex-col relative overflow-hidden group hover:shadow-2xl transition-all duration-300`}
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 text-6xl group-hover:scale-110 transition-transform duration-300">
              {template.icon}
            </div>
            
            <div className="relative z-10 flex-1">
              <h3 className="text-2xl font-bold text-white mb-3">{template.title}</h3>
              <p className="text-white/70 leading-relaxed mb-8">
                {template.description}
              </p>
            </div>
            
            <div className="relative z-10 mt-auto pt-6 border-t border-white/10">
              <Button 
                onClick={() => handleUseTemplate(template)} 
                disabled={creatingId !== null}
                className="w-full bg-white text-black hover:bg-white/90 rounded-xl font-medium"
              >
                {creatingId === template.id ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Use Template
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
