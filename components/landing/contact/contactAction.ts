"use server";

export async function submitContactForm(prevState: any, formData: FormData) {
  
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  if (!name || !email || !subject || !message) {
    return {
      success: false,
      message: "يرجى ملء جميع الحقول المطلوبة.",
    };
  }

  return {
    success: true,
    message: "تم إرسال رسالتك بنجاح! سنتواصل معك في أقرب وقت ممكن.",
  };
}
