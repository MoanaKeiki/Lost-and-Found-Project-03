
console.log("PROFILE SCRIPT LOADED");

document.addEventListener("DOMContentLoaded", async function () {

    console.log("PAGE READY");

    // Check Supabase connection
    console.log("Database:", db);

    // Check current user
    const result = await db.auth.getUser();

    console.log("USER RESULT:", result);

    if (result.error || !result.data.user) {
        console.log("No logged-in user");
        return;
    }

    const user = result.data.user;

    // Load account
    const accountResult = await db
        .from("accounts")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

    console.log("ACCOUNT RESULT:", accountResult);

    if (accountResult.error) {
        console.log("ACCOUNT ERROR:", accountResult.error.message);
        return;
    }

    if (!accountResult.data) {
        console.log("No account row for this user");
        return;
    }

    // Display data
    document.getElementById("profile-name").textContent =
        accountResult.data.full_name;

    document.getElementById("profile-email").textContent =
        accountResult.data.email;

    document.getElementById("profile-student-id").textContent =
        accountResult.data.student_id || "Student";

    document.getElementById("profile-verification").textContent =
        user.email_confirmed_at ? "✓ Email confirmed" : "Not verified";

    console.log("PROFILE LOADED SUCCESSFULLY");

});
