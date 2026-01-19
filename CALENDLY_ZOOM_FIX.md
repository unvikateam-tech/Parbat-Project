# Calendly & Zoom Setup

You mentioned "calendly.com refusing to connect" and "make zoom meeting".

## 1. Fix "Refused to Connect"
The error `refused to connect` inside the widget usually means **your Calendly link is invalid 404**.

1.  **Check your Username**: Is your Calendly URL actually `calendly.com/parbatsales`?
    *   Visit [https://calendly.com/parbatsales](https://calendly.com/parbatsales) in a new tab.
    *   If it says **"Page Not Found"**, you need to Create an Account or change the username in `src/app/contact/page.tsx` line 290.
2.  **Private Event Types**: Ensure your event type is **Public**, not Secret.

## 2. Enable Zoom Meetings
I cannot enable Zoom via code. You must do this in Calendly:

1.  Log in to [Calendly.com](https://calendly.com).
2.  Go to **Integrations** > **Zoom** and connect your account.
3.  Go to the **Event Type** you want people to book (e.g., "Strategy Call").
4.  Click **Edit** > **Event Location**.
5.  Select **Zoom** from the dropdown.

Now, when someone books via your website, Calendly will automatically generate a Zoom link and email it to them.
