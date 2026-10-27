import { NextRequest, NextResponse } from "next/server";
import { emailSignup } from "@/content/email";

export async function POST(req: NextRequest) {
  try {
    const { name, email, source } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
    }

    const formAction = emailSignup.formAction;

    if (formAction) {
      try {
        const formData = new URLSearchParams();
        formData.append(emailSignup.emailFieldName || "email", email.trim().toLowerCase());
        formData.append("tag", typeof source === "string" && source ? source : "site");
        if (name) {
          formData.append("metadata", JSON.stringify({ first_name: name.trim() }));
        }

        // Post to Buttondown or hosted provider
        await fetch(formAction, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        });
      } catch (err) {
        // Silently continue so the user still receives their script even if the mailing service errors
        console.error("Failed to forward to email provider:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscribe API error:", err);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
