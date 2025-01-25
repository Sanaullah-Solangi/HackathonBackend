const updatePassword = async () => {
  try {
    const pass = password.value;
    let { value, error } = passwordSchema.validate(pass);
    error = error?.details[0]?.message;
    console.log("JOI ERROR IN HELPER INDEX", error);
    if (error) {
      const response = sendUserResponse(
        400,
        null,
        error,
        "Invalid credentials. Please try again."
      );
      throw response;
    }
    console.log("Iam called");
    password.style.borderColor = "green";
    let response = await fetch(
      "hackathon-backend-olive.vercel.app/api/user/update-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: value, email }),
      }
    );

    if (response.ok) {
      response = await response.json(); //
      console.log("Password updated successfully!", response.data);
      window.location.href = response.data;
    } else {
      console.log("Error updating password.");
    }
    password.value = "";
  } catch (error) {
    throw error;
  }
};

