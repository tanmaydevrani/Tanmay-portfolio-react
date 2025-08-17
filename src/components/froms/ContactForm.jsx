import { useState } from "react";
import { useForm } from "react-hook-form";
import { success, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {ID } from "appwrite";
import conf from "../../conf/conf";
import Spinner from 'react-bootstrap/Spinner';
import {databases} from "../../appwrite/appwrite"

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().max(0, "Bot detected").optional(), 
});

export default function ContactForm({sendButton=""}) {
  const [status, setStatus] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      if (data.website) {
        setStatus("success");
        reset();
        return;
      }

      const dbId = conf.appwriteDatabaseId;
      const colId = conf.appwriteCollectionId;

      await databases.createDocument(dbId, colId, ID.unique(), {
        name: data.name,
        email: data.email,
        subject: data.subject || "",
        message: data.message,
        createdAt: new Date().toISOString(),
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus("success");
      reset();
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        msg: "Something went wrong. Please try again.",
      });
    }
  };

  if (status === "success"){
    return(
        <div className="outline-2 outline-gray-200 text-center space-y-4 max-w-3xl bg-white p-4 rounded-2xl m-auto w-full">
            <div className="p-3 mb-4 m-auto bg-green-100 w-fit rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big h-10 w-10 text-green-600 dark:text-green-200" aria-hidden="true"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
            </div>
            <h3 className="!font-black">Message Sent!</h3>
            <p className="text-gray-500">Thank you for reaching out. I'll get back to you as soon as possible.</p>
            <button
                className="m-auto d-flex gap-2 bg-white !text-black border-2 border-gray-200 hover:!bg-gray-200 dark:!bg-gray-800 dark:!text-white dark:hover:!g-gray-900 dark:hover:!text-gray-900 transition-all duration-200 !rounded-[10px] py-2 px-3 !text-[14px]"
                onClick={()=>setStatus({type:"",msg:''})}>
                Send Another Message
            </button>  
        </div>
    )
  }
    return (
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-3xl bg-white p-4 rounded-2xl m-auto w-full outline-2 outline-gray-200"
        >
        <h6 className="!font-black mb-1">Send me a message</h6>
        <p className="!text-gray-500 text-sm">Fill out the form below and I'll get back to you as soon as possible.</p>
        <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
            {...register("name")}
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Your name"
            />
            {errors.name && (
            <p className="text-red-700 text-sm">{errors.name.message}</p>
            )}
        </div>

        <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
            {...register("email")}
            type="email"
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Your email"
            />
            {errors.email && (
            <p className="text-red-700 text-sm">{errors.email.message}</p>
            )}
        </div>

        <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
            {...register("subject")}
            type="text"
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Enter subject"
            />
        </div>

        <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
            {...register("message")}
            rows={3}
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Enter your message"
            />
            {errors.message && (
            <p className="text-red-700 text-sm">{errors.message.message}</p>
            )}
        </div>

        <input
            type="text"
            {...register("website")}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
        />

        <button
            type="submit"
            disabled={isSubmitting}
            className={`${sendButton} flex !rounded-xl items-center bg-black text-white px-4 py-2 disabled:opacity-60`}
        >
            {isSubmitting ? (
                <div className="flex gap-2 items-center">
                    Sending
                    <Spinner animation="border" size="sm" />
                </div>
            ) : (
                <>
                    Send Message
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send ml-2 h-4 w-4" aria-hidden="true"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path><path d="m21.854 2.147-10.94 10.939"></path></svg>
                </>
            )}
        </button>

        {status.msg && (
            <p
            className={`text-sm ${
                status.type === "success" ? "text-green-600" : "text-red-600"
            }`}
            >
            {status.msg}
            </p>
        )}
        </form>
    );

}
