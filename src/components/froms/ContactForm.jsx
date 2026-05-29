import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { createMessage } from "../../lib/storage";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Enter a valid email"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().max(0, "Bot detected").optional(),
});

export default function ContactForm({ fullWidth = false }) {
  const { t } = useTranslation();
  const [status, setStatus] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "", website: "" },
  });

  const onSubmit = async (data) => {
    if (data.website) { setStatus("success"); reset(); return; }
    createMessage({ name: data.name, email: data.email, subject: data.subject || "", message: data.message });
    await new Promise((r) => setTimeout(r, 400));
    setStatus("success");
    reset();
  };

  if (status === "success") {
    return (
      <div className="ios-card text-center p-8 flex flex-col items-center gap-4" style={{ width: fullWidth ? "100%" : undefined }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(52,199,89,0.12)" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/>
          </svg>
        </div>
        <div>
          <h3 className="!font-bold !text-[20px] !m-0 mb-1">{t("contact.success_title")}</h3>
          <p className="text-[14px] !m-0" style={{ color: "var(--label-secondary)" }}>{t("contact.success_body")}</p>
        </div>
        <button className="ios-btn ios-btn-secondary mt-2" onClick={() => setStatus("")}>
          {t("contact.send_another")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="ios-card p-6 flex flex-col gap-4"
      style={{ width: fullWidth ? "100%" : undefined }}
    >
      <div>
        <h3 className="!font-bold !text-[18px] !m-0 mb-1">{t("contact.form_title")}</h3>
        <p className="text-[13px] !m-0" style={{ color: "var(--label-secondary)" }}>{t("contact.form_subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--label)" }}>{t("contact.name")}</label>
          <input {...register("name")} className="ios-input" placeholder={t("contact.name_placeholder")} />
          {errors.name && <p className="text-[12px] mt-1" style={{ color: "var(--red)" }}>{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--label)" }}>{t("contact.email")}</label>
          <input {...register("email")} type="email" className="ios-input" placeholder={t("contact.email_placeholder")} />
          {errors.email && <p className="text-[12px] mt-1" style={{ color: "var(--red)" }}>{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--label)" }}>{t("contact.subject")}</label>
        <input {...register("subject")} className="ios-input" placeholder={t("contact.subject_placeholder")} />
      </div>

      <div>
        <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--label)" }}>{t("contact.message")}</label>
        <textarea {...register("message")} rows={4} className="ios-input resize-none" placeholder={t("contact.message_placeholder")} />
        {errors.message && <p className="text-[12px] mt-1" style={{ color: "var(--red)" }}>{errors.message.message}</p>}
      </div>

      <input type="text" {...register("website")} className="hidden" tabIndex={-1} autoComplete="off" />

      <button type="submit" disabled={isSubmitting} className="ios-btn ios-btn-primary self-start disabled:opacity-50">
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            {t("contact.sending")}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            {t("contact.send")}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/>
              <path d="m21.854 2.147-10.94 10.939"/>
            </svg>
          </span>
        )}
      </button>
    </form>
  );
}
