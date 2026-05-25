"use client";

import { useState, useEffect } from "react";
import { trpc } from "~/trpc/client";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "~/components/ui/card";
import { toast } from "sonner";
import { Loader2, Star } from "lucide-react";
import { cn } from "~/lib/utils";

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
        button: "bg-black hover:bg-slate-800 text-white",
        title: "text-slate-900 font-bold tracking-tight",
        desc: "text-slate-500",
        accent: "text-blue-500",
        star: "text-red-500",
        check: "border-slate-300",
      };
  }
}

export default function PublicForm({ slug }: { slug: string }) {
  const { data: form, isLoading, error } = trpc.form.getPublicFormBySlug.useQuery({ slug }, {
    retry: false,
  });

  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  useEffect(() => {
    if (form?.id) {
      const isSubmitted = localStorage.getItem(`form_submitted_${form.id}`);
      if (isSubmitted) {
        setAlreadySubmitted(true);
        setSubmitted(true);
      }
    }
  }, [form?.id]);

  const submitMutation = trpc.form.submitResponse.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      if (form?.id) {
        localStorage.setItem(`form_submitted_${form.id}`, "true");
      }
      toast.success("Response submitted successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to submit response.");
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d]">
        <Loader2 className="w-8 h-8 animate-spin text-white/50" />
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] text-white">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Form not available</h2>
          <p className="text-white/50">{error?.message || "This form could not be found."}</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    const s = getThemeStyles(form.theme || "apple-glass");
    return (
      <div className={cn("min-h-screen flex items-center justify-center p-6", s.wrapper)}>
        <Card className={cn("w-full max-w-lg shadow-2xl backdrop-blur-xl", s.card)}>
          <CardHeader className="text-center">
            <CardTitle className={cn("text-3xl font-bold mb-2", s.title)}>
              {alreadySubmitted ? "Already Submitted" : "Thank You!"}
            </CardTitle>
            <CardDescription className={s.desc}>
              {alreadySubmitted ? "You have already responded to this form." : "Your response has been recorded."}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const handleFieldChange = (fieldId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate({ formId: form.id, answers });
  };

  const s = getThemeStyles(form.theme || "apple-glass");

  const renderField = (field: any) => {
    const value = answers[field.id] || "";
    
    const getOptions = (fieldOptions: any) => {
      if (Array.isArray(fieldOptions)) return fieldOptions;
      if (fieldOptions?.choices && Array.isArray(fieldOptions.choices)) return fieldOptions.choices;
      return [];
    };

    switch (field.type) {
      case "short_text":
      case "email":
      case "number":
      case "date":
        return (
          <Input
            type={field.type === "short_text" ? "text" : field.type}
            placeholder={field.placeholder || ""}
            required={field.required}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className={cn("h-12", s.input)}
          />
        );
      case "long_text":
        return (
          <Textarea
            placeholder={field.placeholder || ""}
            required={field.required}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className={cn("min-h-[100px]", s.input)}
          />
        );
      case "checkbox":
        return (
          <div className="flex items-center space-x-3 mt-2">
            <Checkbox 
              id={field.id}
              checked={!!value}
              onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
              className={cn("data-[state=checked]:text-white", s.check, form.theme === "startup-minimal" ? "data-[state=checked]:bg-gray-900" : "")}
            />
            <Label htmlFor={field.id} className={cn("cursor-pointer", s.label)}>{field.label}</Label>
          </div>
        );
      case "single_select":
      case "dropdown":
        return (
          <Select value={value} onValueChange={(v) => handleFieldChange(field.id, v)}>
            <SelectTrigger className={cn("h-12", s.input)}>
              <SelectValue placeholder={field.placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent className={s.wrapper}>
              {getOptions(field.options).map((opt: string) => (
                <SelectItem key={opt} value={opt} className="cursor-pointer">
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "rating":
        const maxRating = parseInt(field.validations?.max || "5", 10);
        return (
          <div className="flex items-center gap-2 mt-2">
            {Array.from({ length: maxRating }).map((_, i) => {
              const ratingValue = i + 1;
              const isSelected = parseInt(value, 10) >= ratingValue;
              return (
                <button
                  key={ratingValue}
                  type="button"
                  onClick={() => handleFieldChange(field.id, ratingValue.toString())}
                  className={cn(
                    "p-2 rounded-full transition-all duration-200",
                    isSelected 
                      ? "text-yellow-400 scale-110" 
                      : "text-white/20 hover:text-white/40 hover:scale-105"
                  )}
                >
                  <Star className={cn("w-8 h-8", isSelected ? "fill-current" : "")} />
                </button>
              );
            })}
          </div>
        );
      default:
        return (
          <div className={cn("text-sm italic", s.desc)}>
            Unsupported field type: {field.type}
          </div>
        );
    }
  };

  return (
    <div className={cn("min-h-screen p-6 sm:p-12", s.wrapper)}>
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-10 text-center sm:text-left">
            <h1 className={cn("text-4xl font-extrabold tracking-tight mb-4", s.title)}>{form.title}</h1>
            {form.description && (
              <p className={cn("text-lg max-w-xl", s.desc)}>{form.description}</p>
            )}
          </div>

          <div className="space-y-8">
            {(form.fields || []).map((field: any) => (
              <div key={field.id} className={cn("rounded-2xl p-6 sm:p-8 backdrop-blur-md transition-colors", s.card)}>
                {field.type !== "checkbox" && (
                  <Label className={cn("text-base font-medium mb-3 block flex items-center gap-2", s.label)}>
                    {field.label}
                    {field.required && <span className={s.star}>*</span>}
                  </Label>
                )}
                {field.helperText && field.type !== "checkbox" && (
                  <p className={cn("text-sm mb-4", s.desc)}>{field.helperText}</p>
                )}
                
                {renderField(field)}
                
                {field.helperText && field.type === "checkbox" && (
                  <p className={cn("text-sm mt-3 ml-7", s.desc)}>{field.helperText}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <Button 
              type="submit"
              disabled={submitMutation.isPending}
              className={cn("px-10 h-14 rounded-xl font-medium text-lg w-full sm:w-auto transition-all active:scale-[0.98]", s.button)}
            >
              {submitMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
