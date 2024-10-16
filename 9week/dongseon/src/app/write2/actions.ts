"use server";

import { revalidatePath } from "next/cache";

export default async function handleSubmit(formData: FormData) {
  console.log(formData.get("title"));
  revalidatePath("/write2");
}
