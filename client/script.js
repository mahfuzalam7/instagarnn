// client/script.js
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  console.log("Attempting login submission...");

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    console.log("Response status:", res.status);
    const responseData = await res.json();
    console.log("Response data:", responseData);

    if (res.ok) {
      alert("Login submitted successfully!");
      e.target.reset();
    } else {
      alert(`Error: ${responseData.error || 'Something went wrong!'}`);
    }
  } catch (err) {
    console.error("Network error:", err);
    alert("Network error. Check console for details.");
  }
});
