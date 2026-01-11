async function testSubscribe() {
    const email = "test-agent-" + Date.now() + "@unvika.com";
    console.log("Testing subscription for:", email);

    try {
        const res = await fetch('http://localhost:3000/api/newsletter/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await res.json();
        console.log("Response Status:", res.status);
        console.log("Response Data:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Fetch failed:", err);
    }
}

testSubscribe();
