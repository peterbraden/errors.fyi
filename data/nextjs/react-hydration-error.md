---
name: "React Hydration Error"
description: "The HTML rendered on the server does not match what React renders on the client during hydration. Common causes include using browser-only APIs (Date, Math.random, localStorage) or conditional rendering that differs between server and client. Wrap the offending component in a dynamic import with ssr: false, or use the useEffect hook to run client-only code after mount."
references:
  - https://nextjs.org/docs/messages/react-hydration-error
  - https://react.dev/errors/418
---
